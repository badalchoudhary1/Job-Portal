from rest_framework import serializers
from .models import CustomUser, JobSeeker


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'role']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user


class JobSeekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSeeker
        fields = "__all__"
        read_only_fields = ['user']

    def validate_email(self, value):
        if JobSeeker.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value
