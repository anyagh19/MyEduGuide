from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    # Link with Django default user
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    # BASIC DETAILS
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
        null=True,
        blank=True
    )
    location = models.CharField(max_length=200, null=True, blank=True)

    # ACADEMICS
    tenth_marks = models.FloatField(null=True, blank=True)
    twelfth_marks = models.FloatField(null=True, blank=True)
    twelfth_stream = models.CharField(
        max_length=20,
        choices=[
            ("science", "Science"),
            ("commerce", "Commerce"),
            ("arts", "Arts"),
            ("other", "Other"),
        ],
        null=True,
        blank=True
    )

    # Diploma
    has_diploma = models.BooleanField(default=False)
    diploma_branch = models.CharField(max_length=100, null=True, blank=True)
    diploma_marks = models.FloatField(null=True, blank=True)

    # Degree
    has_degree = models.BooleanField(default=False)
    degree_name = models.CharField(max_length=100, null=True, blank=True)
    degree_branch = models.CharField(max_length=100, null=True, blank=True)
    degree_cgpa = models.FloatField(null=True, blank=True)
    backlogs = models.IntegerField(null=True, blank=True)

    # SKILLS (Comma separated lists)
    technical_skills = models.TextField(null=True, blank=True)  # store as csv: "Python,React,UI"
    soft_skills = models.TextField(null=True, blank=True)
    languages_known = models.TextField(null=True, blank=True)

    # INTERESTS & PERSONALITY
    hobbies = models.TextField(null=True, blank=True)
    interests = models.TextField(null=True, blank=True)
    favorite_subjects = models.TextField(null=True, blank=True)
    personality_traits = models.TextField(null=True, blank=True)

    # GOALS
    short_term_goal = models.TextField(null=True, blank=True)
    long_term_goal = models.TextField(null=True, blank=True)
    dream_job = models.CharField(max_length=200, null=True, blank=True)

    study_preference = models.CharField(
        max_length=20,
        choices=[("online", "Online"), ("offline", "Offline"), ("both", "Both")],
        null=True,
        blank=True
    )

    career_path = models.CharField(
        max_length=20,
        choices=[
            ("job", "Job"),
            ("business", "Business"),
            ("freelancing", "Freelancing"),
            ("higher_study", "Higher Study"),
            ("government", "Government Exams")
        ],
        null=True,
        blank=True
    )

    # CONSTRAINTS
    budget = models.IntegerField(null=True, blank=True)

    # ABOUT / SUMMARY
    about = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
