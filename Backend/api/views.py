from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, UserProfileSerializer , UserProgressSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserProfile , UserProgress
from django.http import JsonResponse
from django.conf import settings
from openai import OpenAI
import json


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return profile


class SuggestCoursesView(APIView):
    permission_classes = [IsAuthenticated]  # JWT auth will be applied here

    def post(self, request):
        user_message = request.data.get("message", "")
        
        if not user_message:
            return Response(
                {"error": "Message is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        user = request.user

        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response(
                {"error": "User profile not found. Please complete your profile first."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        profile_data = {
            "username": user.username,
            "email": user.email,
            "dob": str(profile.dob) if profile.dob else None,
            "gender": profile.gender,
            "location": profile.location,
            "tenth_marks": profile.tenth_marks,
            "twelfth_marks": profile.twelfth_marks,
            "twelfth_stream": profile.twelfth_stream,
            "technical_skills": profile.technical_skills,
            "interests": profile.interests,
            "short_term_goal": profile.short_term_goal,
            "long_term_goal": profile.long_term_goal,
            "dream_job": profile.dream_job,
        }

        prompt = f"""
You are an expert education counselor. Based on the student profile below, suggest relevant online courses.

Student Profile:
{json.dumps(profile_data, indent=2)}

User Query: "{user_message}"

Provide course recommendations in the following JSON format:
{{
  "beginner": [
    {{"title": "Course Name", "link": "https://...", "provider": "Coursera", "description": "Brief description"}}
  ],
  "intermediate": [...],
  "advanced": [...],
  "career_roadmap": "A brief career path suggestion",
  "recommended_skills": ["skill1", "skill2"]
}}

Respond ONLY with valid JSON, no markdown formatting.
"""

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system", 
                        "content": "You are a helpful course recommendation assistant. Always respond with valid JSON only."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )

            raw_answer = response.choices[0].message.content
            
            # Remove markdown code blocks if present
            if raw_answer.startswith("```"):
                lines = raw_answer.split("```")
                if len(lines) >= 2:
                    raw_answer = lines[1]
                    if raw_answer.startswith("json"):
                        raw_answer = raw_answer[4:]
                    raw_answer = raw_answer.strip()

            answer_json = json.loads(raw_answer)
            
            return Response({
                "courses": answer_json,
                "user": user.username  # Optional: return username
            })

        except json.JSONDecodeError:
            return Response({"courses": {"raw_text": raw_answer}})
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProgressView(generics.ListCreateAPIView):
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GenerateQuizView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        studied_text = request.data.get("studied", "")

        if not studied_text:
            return Response({"error": "Studied text is required"}, status=400)

        prompt = f"""
Generate exactly 10 MCQ questions based on the following text:

\"\"\"{studied_text}\"\"\"

Return ONLY valid JSON, nothing else.

Format:
{{
  "quiz": [
    {{
      "question": "string",
      "options": ["a", "b", "c", "d"],
      "answer": "a"
    }}
  ]
}}
"""

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Respond only with JSON."},
                    {"role": "user", "content": prompt},
                ],
                temperature=0.2,
                max_tokens=800,
            )

            raw = response.choices[0].message.content.strip()

            # 🔥 Remove accidental markdown container
            if raw.startswith("```"):
                raw = raw.replace("```json", "").replace("```", "").strip()

            # 🔥 Auto-fix: ensure the text ends before any trailing noise
            first_brace = raw.find("{")
            last_brace = raw.rfind("}")
            raw = raw[first_brace:last_brace+1]

            quiz_json = json.loads(raw)
            return Response(quiz_json, status=200)

        except Exception as e:
            return Response(
                {"error": "Invalid JSON from OpenAI", "raw": raw, "exception": str(e)},
                status=500,
            )


class UpdateQuizResultView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            record = UserProgress.objects.get(id=pk, user=request.user)
        except UserProgress.DoesNotExist:
            return Response({"error": "Progress not found"}, status=404)

        score = int(request.data.get("score", 0))
        total = int(request.data.get("total", 0))

        percentage = (score / total) * 100 if total > 0 else 0

        record.score = score
        record.total = total
        record.percentage = percentage
        record.save()

        return Response({"message": "Quiz result updated!"})
