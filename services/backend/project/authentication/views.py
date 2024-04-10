from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.core.serializers import serialize
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import json

from .serializers import UserSerializer
from authentication.models import User

@api_view(['POST'])
def signup(request):
    if User.objects.filter(username=request.data['username']).exists():
        raise ValidationError({'error': 'Username is already taken'})

    user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
    token = Token.objects.create(user=user)
    user.save()
    serialized = UserSerializer(user)
    return JsonResponse({'Token': token.key, 'user': serialized.data})

@api_view(['POST'])
def log_user(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        raise AuthenticationFailed("Username or password is incorrect.")

    if user.check_password(request.data['password']):
        token, created = Token.objects.get_or_create(user=user)
        user.is_online = True
        user.save()
        serialized = UserSerializer(user)
        return JsonResponse({'Token': token.key, 'user': serialized.data})

    raise AuthenticationFailed("Username or password is incorrect.")

def is_auth(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        print(data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def user_detail(request):
    user = request.user
    serialized = UserSerializer(user)
    return JsonResponse({'user': serialized.data})
