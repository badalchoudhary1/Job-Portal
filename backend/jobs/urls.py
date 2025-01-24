# urls.py
from django.urls import path, include
from .views import register_user, profile, login_user, JobSeekerViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'jobseeker', JobSeekerViewSet, basename='jobseeker')


urlpatterns = [
    path('api/register/', register_user, name='register_user'),
    path('api/login/', login_user, name='login_user'),
    path('api/profile/', profile, name='profile'),
    path('api/', include(router.urls)),
]
