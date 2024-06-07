from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.conf import settings
from django.core.files.base import ContentFile

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

import json
import requests
import os

from authentication.serializers import UserSerializer, MatchSerializer
from authentication.models import User, Match


@api_view(['POST'])
def log_user(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        raise AuthenticationFailed({'error': 'Username is incorrect.'})

    if user.is_student == True:
        raise AuthenticationFailed({'error': 'Please use 42 authentication to log as this user'})
    if user.check_password(request.data['password']):
        user.save()
        serialized = UserSerializer(user)
        return JsonResponse({'user': serialized.data})

    raise AuthenticationFailed({'error': 'password is incorrect.'})

@api_view(['POST'])
def add_match(request):
    try:
        date = request.data['date']
        p1_id = request.data['p1ID']
        p1_result = request.data['p1Result']
        p2_id = request.data['p2ID']
        p2_result = request.data['p2Result']
        is_pong = request.data['is_pong']
        if p1_result > p2_result:
            winner_id = p1_id
            if p1_id != '0':
                user1 = User.objects.get(id=p1_id)
                user1.win += 1
                user1.save()
            if p2_id != '0':
                user2 = User.objects.get(id=p2_id)
                user2.loss += 1
                user2.save()
        elif p1_result < p2_result:
            winner_id = p2_id
            if p1_id != 0:
                user1 = User.objects.get(id=p1_id)
                user1.loss += 1
                user1.save()
            if p2_id != 0:
                user2 = User.objects.get(id=p2_id)
                user2.win += 1
                user2.save()
        else:
            winner_id = None

        match = Match.objects.create(
            p1_id=p1_id,
            p2_id=p2_id,
            date=date,
            p1_score=p1_result,
            p2_score=p2_result,
            winner_id=winner_id,
            is_pong=is_pong,
        )

        return Response({'message': 'Match added successfully.'}, status=status.HTTP_201_CREATED)
    except KeyError as e:
        return Response({'error': f'Missing field: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist as e:
        return Response({'error': 'A user involved in the match does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_all_matches(request):
    matches = Match.objects.all()
    serialized = MatchSerializer(matches, many=True)
    return Response(serialized.data)

@api_view(['GET'])
def get_user_matches(request, user_id):
    matches = Match.objects.filter(p1_id=user_id) | Match.objects.filter(p2_id=user_id)
    serialized = MatchSerializer(matches, many=True)
    return Response(serialized.data)


@api_view(['POST', 'GET'])
def ft_login_tournament(request):
    code = request.GET.get('code')
    if code:
        url = 'https://api.intra.42.fr/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': os.getenv('UID_KEY'),
            'client_secret': os.getenv('SECRET_KEY'),
            'code': code,
            'redirect_uri': 'http://localhost:3000/tournament/'
        }
        response = requests.post(url, data=data)

    if response.status_code == 200:
            token = response.json().get('access_token')
            if token:
                user_response = requests.get('https://api.intra.42.fr/v2/me', headers={
                    'Authorization': f'Bearer {token}'
                })

                if user_response.status_code == 200:
                    user_data = user_response.json()  
                    username = user_data.get('login')
                    email = user_data.get('email')
                    user, created = User.objects.get_or_create(email=email, defaults={'username': username})
                    if created:
                        user.username = username
                        profile_pic_data = user_data.get('image')
                        if profile_pic_data:
                            profile_pic_url = profile_pic_data.get('link')
                            if profile_pic_url:
                                response = requests.get(profile_pic_url)
                                if response.status_code == 200:
                                    user.profile_pic.save(f'{username}_profile_pic.jpg', ContentFile(response.content))
                        user.is_student = True
                        user.save()
                    elif user.is_student == False:
                        raise AuthenticationFailed({'error': 'This username is not registered as a 42 student'})
                    token, created = Token.objects.get_or_create(user=user)
                    user.is_online = True
                    serialized = UserSerializer(user)
                    return JsonResponse({'user': serialized.data})
    raise AuthenticationFailed({'error': '42 auth failed'})