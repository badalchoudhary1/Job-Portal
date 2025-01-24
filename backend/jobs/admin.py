from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, JobSeeker


class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Role Information', {'fields': ('role',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(JobSeeker)
class JobSeekerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'location')
    search_fields = ('name', 'email')
