from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =['id' , 'username' , 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self , validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("user", None)  # prevent user overwrite
        return super().update(instance, validated_data)
