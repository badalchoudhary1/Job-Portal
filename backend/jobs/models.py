# jobs/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser


class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    employer = models.ForeignKey('EmployerProfile', on_delete=models.CASCADE)

    location = models.CharField(max_length=255)
    salary = models.CharField(max_length=100, blank=True, null=True)

    posted_at = models.DateTimeField(auto_now_add=True)

    applicant = models.ForeignKey('CustomUser', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.title

# Model to store job seekers' applications to a job
class JobApplication(models.Model):
    PENDING = 'pending'
    ACCEPTED = 'accepted'
    REJECTED = 'rejected'
    
    APPLICATION_STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected')
    ]
    
    job = models.ForeignKey('Job', on_delete=models.CASCADE)
    applicant = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=APPLICATION_STATUS_CHOICES, default=PENDING)
    
    class Meta:
        unique_together = ('job', 'applicant')  # Ensure a job seeker applies only once for the same job

    def __str__(self):
        return f"{self.applicant.username} applied for {self.job.title} - {self.status}"

class EmployerProfile(models.Model):
    company_name = models.CharField(max_length=255)
    description = models.TextField()
    logo = models.ImageField(upload_to='employer_logos/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.company_name

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('job_seeker', 'Job Seeker'),
        ('employer', 'Employer'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='job_seeker')

    def __str__(self):
        return self.username
    
class JobSeeker(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
