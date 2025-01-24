# jobs/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    )
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='job_seeker')

    def __str__(self):
        return self.username


class JobSeeker(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="jobseeker_profile")
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    location = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", blank=True, null=True)

    def __str__(self):
        return self.name
