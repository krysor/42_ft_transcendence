from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

import json

from django.conf import settings
import os

from .serializers import UserSerializer
from authentication.models import User

@api_view(['POST'])
def signup(request):
    if User.objects.filter(username=request.data['username']).exists():
        raise ValidationError({'error': 'Username is already taken'})

    if len(request.data.get('username', '')) < 0 or len(request.data.get('username', '')) > 20:
            raise ValidationError({'error': 'username must be at least 1 and less than 20 characters long'})
    if len(request.data.get('password', '')) < 8:
            raise ValidationError({'error': 'Password must be at least 8 characters long'})

    request.data['username'] = request.data.get('username', '').strip()
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        token = Token.objects.create(user=user)
        user.is_online = True
        user.save()
        serialized = UserSerializer(user)
        return JsonResponse({'Token': token.key, 'user': serialized.data})

    print(serialized.errors)
    return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def log_user(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        raise AuthenticationFailed({'error': 'Username is incorrect.'})

    if user.check_password(request.data['password']):
        token, created = Token.objects.get_or_create(user=user)
        user.is_online = True
        user.save()
        serialized = UserSerializer(user)
        return JsonResponse({'Token': token.key, 'user': serialized.data})

    raise AuthenticationFailed({'error': 'password is incorrect.'})

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def logout(request):
    user = request.user
    user.is_online = False
    user.save()
    serialized = UserSerializer(user)
    return JsonResponse({'user': serialized.data})

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def user_detail(request):
    user = request.user
    serialized = UserSerializer(user)
    return JsonResponse({'user': serialized.data})

@api_view(['GET'])
def get_user_by_id(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        serialized = UserSerializer(user)
        return Response(serialized.data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User user not found.'}, status=404)

@api_view(['GET'])
def all_users(request):
    users = User.objects.all()
    serialized = UserSerializer(users, many=True)
    return Response(serialized.data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def friend_list(request):
    user = request.user
    friends = user.friends.all()
    serialized = UserSerializer(friends, many=True)
    return Response(serialized.data)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_friend(request, friend_id):
    user = request.user
    try:
        friend = User.objects.get(pk=friend_id)
        user.friends.add(friend)
        user.save()
        serialized_user = UserSerializer(user)
        serialized_friend = UserSerializer(friend)
        return JsonResponse({'user': serialized_user.data, 'friend': serialized_friend.data})
    except User.DoesNotExist:
        return JsonResponse({'error': 'Friend user not found.'}, status=404)
    
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def remove_friend(request, friend_id):
    user = request.user
    try:
        friend = User.objects.get(pk=friend_id)
        user.friends.remove(friend)
        user.save()
        serialized_user = UserSerializer(user)
        serialized_friend = UserSerializer(friend)
        return JsonResponse({'user': serialized_user.data, 'friend': serialized_friend.data})
    except User.DoesNotExist:
        return JsonResponse({'error': 'Friend user not found.'}, status=404)

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def edit_profile(request):
    user = request.user
    
    if request.data.get('username') and User.objects.filter(username=request.data['username']).exists():
        raise ValidationError({'error': 'Username is already taken'})

    if request.data.get('username') and len(request.data.get('username', '')) > 20:
            raise ValidationError({'error': 'username must be at least 1 and less than 20 characters long'})
    if request.data.get('password') and len(request.data.get('password', '')) < 8 and len(request.data.get('password', '')) != 0:
            raise ValidationError({'error': 'Password must be at least 8 characters long'})

    if request.data.get('username'):
        user.username = request.data.get('username')

    if request.data.get('password'):
        user.set_password(request.data.get('password'))
    
    new_profile_pic = request.FILES.get('profile_pic')
    if new_profile_pic:
        user.profile_pic.save(new_profile_pic.name, new_profile_pic)

    user.save()
    serialized = UserSerializer(user)
    return JsonResponse({'user': serialized.data})

@api_view(['GET'])  
def profile_pic(request, filename):
    img_path = os.path.join(settings.MEDIA_ROOT, filename)

    try:
        with open(img_path, 'rb') as f:
            img_data = f.read()

        return HttpResponse(img_data, content_type='image/jpeg')
    except FileNotFoundError:
        return HttpResponse(status=404)