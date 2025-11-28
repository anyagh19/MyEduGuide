from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer , UserProfileSerializer
from rest_framework.permissions import IsAuthenticated , AllowAny
from .models import UserProfile

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #get all the users
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # If profile exists, return it. Otherwise, return a blank instance
        profile, _ = UserProfile.objects.get_or_create(user=self.request.user)
        return profile