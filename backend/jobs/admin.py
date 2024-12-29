from django.contrib import admin
from .models import JobSeeker

@admin.register(JobSeeker)
class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'created_at']
