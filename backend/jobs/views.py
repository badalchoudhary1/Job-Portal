
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import JobSerializer
from .models import Job
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
# views.py
from rest_framework.decorators import action 
from rest_framework import status, viewsets
from .models import EmployerProfile
from .serializers import EmployerProfileSerializer
from rest_framework import generics
from .models import JobSeeker
from .serializers import JobSeekerSerializer


from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])   # Allows anyone to access this endpoint
def job_list(request):
    if request.method == 'GET':
        title = request.query_params.get('title', None)
        company_name = request.query_params.get('company_name', None)

        jobs = Job.objects.all()

        # Apply filters if provided
        if title:
            jobs = jobs.filter(title__icontains=title)
        if company_name:
            jobs = jobs.filter(company_name__icontains=company_name)

        # Pagination (optional)
        paginator = PageNumberPagination()
        paginator.page_size = 12  # Adjust page size as needed
        result_page = paginator.paginate_queryset(jobs, request)
        serializer = JobSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    elif request.method == 'POST':
        serializer = JobSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny]) 
def job_detail(request, pk):
    try:
        job = Job.objects.get(pk=pk)
    except Job.DoesNotExist:
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = JobSerializer(job)
    return Response(serializer.data)


@permission_classes([AllowAny]) 
class EmployerProfileViewSet(viewsets.ModelViewSet):
    queryset = EmployerProfile.objects.all()
    serializer_class = EmployerProfileSerializer

    def get_queryset(self):
        return EmployerProfile.objects.all()

    @action(detail=True, methods=['get'])
    def profile(self, request, pk=None):
        try:
            profile = EmployerProfile.objects.get(id=pk)
            serializer = EmployerProfileSerializer(profile)
            return Response(serializer.data)
        except EmployerProfile.DoesNotExist:
            return Response({'detail': 'Employer profile not found.'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def create_profile(self, request):
        data = request.data
        serializer = EmployerProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@permission_classes([AllowAny]) 
class JobSeekerListCreateView(generics.ListCreateAPIView):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer
@permission_classes([AllowAny]) 
class JobSeekerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobSeeker.objects.all()
    serializer_class = JobSeekerSerializer

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

    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'message': 'Login successful',
            'token': token.key  # Return token after successful login
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