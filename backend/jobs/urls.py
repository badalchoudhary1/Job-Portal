

# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import job_list, apply_job,job_detail, EmployerProfileViewSet ,JobSeekerListCreateView,JobSeekerDetailView ,register_user,profile,login_user

# Create a router and register the EmployerProfile viewset
router = DefaultRouter()
router.register(r'employer-profile', EmployerProfileViewSet, basename='employer-profile')

# Add the router to the URL patterns
urlpatterns = [
    path('jobs/', job_list, name='job_list'),
    path('jobs/<int:pk>/', job_detail, name='job_detail'),
    path('jobs/apply/', apply_job, name='apply_job'),
    path('api/', include(router.urls)),
    path('job-seekers/', JobSeekerListCreateView.as_view(), name='job-seeker-list-create'),
    path('job-seekers/<int:pk>/', JobSeekerDetailView.as_view(), name='job-seeker-detail'),
    path('api/register/', register_user, name='register_user'),
    path('api/login/', login_user, name='login_user'),
    path('api/profile/', profile, name='profile'),
]

