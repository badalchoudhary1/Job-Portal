
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model


from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .serializers import RegisterSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from rest_framework import viewsets
from rest_framework.decorators import action
from .models import JobSeeker
from .serializers import JobSeekerSerializer

from .models import Employer
from .serializers import EmployerSerializer


class EmployerProfileViewSet(viewsets.ModelViewSet):
    """
    Viewset to manage Employer profiles.
    Employers can create, view, and update their own profile.
    Admin users can access all employer profiles.
    """
    queryset = Employer.objects.all()
    serializer_class = EmployerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Employers can only view their own profile.
        Admin users can view all employer profiles.
        """
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:  # Allow admins to view all profiles
                return Employer.objects.all()
            # Restrict to the logged-in employer
            return Employer.objects.all()
        return Employer.objects.none()

    # def get_queryset(self):
    #     """
    #     Employers can only view their own profile.
    #     Admin users can view all employer profiles.
    #     """
    #     user = self.request.user
    #     if user.is_authenticated:
    #         if user.is_staff:
    #             return Employer.objects.filter(user=user)
    #         return Employer.objects.filter(user=user)
    #     return Employer.objects.none()

    @action(detail=False, methods=['post'], url_path="create-emp-profile")
    def create_profile(self, request):
        """
        Allows employers to create a profile.
        Prevents duplicate profile creation for the same user.
        """
        user = request.user
        if Employer.objects.filter(user=user).exists():
            return Response({"error": "Employer profile already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        """
        Modify retrieve method to prevent showing irrelevant or specific useless data.
        """
        try:
            instance = self.get_object()  # Get the specific object
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Employer.DoesNotExist:
            return Response({"detail": "Employer profile not found."}, status=status.HTTP_404_NOT_FOUND)


class JobSeekerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Job Seeker profiles.
    """
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return all job seeker profiles for authenticated users.
        """
        user = self.request.user
        if user.is_authenticated:
            return JobSeeker.objects.all()  # Allow viewing all profiles
        return JobSeeker.objects.none()  # Return no data for unauthenticated users

    @action(detail=False, methods=["post"], url_path="create-profile")
    def create_profile(self, request):
        """
        Handle job seeker profile creation.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        """
        Modify retrieve method to prevent showing irrelevant or specific useless data.
        """
        try:
            instance = self.get_object()  # Get the specific object
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except JobSeeker.DoesNotExist:
            return Response({"detail": "Job Seeker profile not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'User registered successfully',
            'role': user.role,
            'token': token.key,
            'username': user.username,
            'email': user.email,
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# User Login View (Token Authentication)
@api_view(['POST'])
@permission_classes([AllowAny])  # Allows anyone to login
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    User = get_user_model()  # Custom user model if using one

    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'username': user.username,
                'email': user.email,
                'role': user.role,  # Ensure `role` is a field in your User model
            }
        }, status=status.HTTP_200_OK)

    return Response({
        'message': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)


# Protected Route Example (Only accessible by logged-in users)
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Requires user to be authenticated
def profile(request):
    return Response({
        'message': f'Hello, {request.user.username}! This is your profile.'
    })
