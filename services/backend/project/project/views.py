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
import requests 
from authentication.serializers import UserSerializer
from authentication.models import User

@api_view(['POST', 'GET'])
def ft_login(request):
    code = request.GET.get('code')
    if code:
        url = 'https://api.intra.42.fr/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': os.getenv('UID_KEY'),
            'client_secret': os.getenv('SECRET_KEY'),
            'code': code,
            'redirect_uri': 'http://localhost:3000/42_auth/'
        }
        response = requests.post(url, data=data)
        print("response 1 =")
        print(response.text)
    
    if response.status_code == 200:
            token = response.json().get('access_token')
            if token:
                # Use the token to fetch user information
                user_response = requests.get('https://api.intra.42.fr/v2/me', headers={
                    'Authorization': f'Bearer {token}'
                })

                if user_response.status_code == 200:
                    user_data = user_response.json()
                    print(user_data)
                    return HttpResponse(status=200)
    raise AuthenticationFailed({'error': '42 auth failed'})