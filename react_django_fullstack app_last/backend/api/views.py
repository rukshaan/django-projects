from django.shortcuts import render


from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import userSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    permission_classes = [AllowAny]  # Allow any user to create a new user