from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, UserProfileSerializer , UserProgressSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import UserProfile , UserProgress
from django.http import JsonResponse
from django.conf import settings
from openai import OpenAI
import json
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
ADMIN_USERNAME='admin'
ADMIN_PASSWORD='admin19'

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:

        # Create test admin user if not exists
        admin_user, created = User.objects.get_or_create(username="admin")
        if created:
            admin_user.set_password("admin19")
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()

        # Generate JWT token
        refresh = RefreshToken.for_user(admin_user)

        users = User.objects.all().values("id", "username", "email")

        return Response({
            "admin": True,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "users": list(users)
        }, status=200)

    return Response({"admin": False, "error": "Invalid admin credentials"}, status=401)

class AdminUserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response({"error": "Not admin"}, status=403)

        users = User.objects.all().values("id", "username", "email", "date_joined")
        return Response(list(users))


class AdminDeleteUser(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        if not request.user.is_staff:
            return Response({"error": "Not authorized"}, status=403)

        try:
            user = User.objects.get(id=pk)
            user.delete()
            return Response({"message": "User deleted"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)


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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def generate_user_report(request):
    user = request.user

    # 1. Fetch User Profile
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = None

    # 2. Fetch Progress List
    progress_entries = UserProgress.objects.filter(user=user).order_by("-date")

    # 3. Build progress text
    progress_text = "\n".join([
        f"- Studied: {p.studied} | Score: {p.score}/{p.total} | Percentage: {p.percentage}% | Date: {p.date}"
        for p in progress_entries
    ])

    # 4. Quiz percentage list
    quiz_percentages = [p.percentage for p in progress_entries if p.percentage is not None]
    avg_percentage = sum(quiz_percentages) / len(quiz_percentages) if quiz_percentages else None

    # 5. Prepare profile summary
    profile_summary = f"""
    Gender: {profile.gender}
    Location: {profile.location}
    10th Marks: {profile.tenth_marks}
    12th Marks: {profile.twelfth_marks}
    Skills: {profile.technical_skills}
    Interests: {profile.interests}
    Goals: {profile.short_term_goal}
    """ if profile else "No profile found."

    # 6. Prepare context for AI
    user_info = f"""
Name: {user.username}
Email: {user.email}

Profile:
{profile_summary}

Study Progress:
{progress_text if progress_text else "No study progress recorded yet."}

Quiz Performance:
Average Percentage: {avg_percentage if avg_percentage else "N/A"}
"""

    # 7. Generate Report Using OpenAI
    from openai import OpenAI
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    prompt = f"""
You are an expert academic mentor. Generate a structured study progress report.

USER DATA:
{user_info}

INCLUDE THESE SECTIONS:
1. Overview summary
2. Learning strengths
3. Weak areas to improve
4. Quiz analysis
5. Study consistency analysis
6. Personalized recommendations
7. Next action plan
8. Motivational message for the user
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    report = response.choices[0].message.content

    return Response({"report": report})
