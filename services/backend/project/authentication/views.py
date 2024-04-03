from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

from rest_framework.authtoken.models import Token

from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from . import forms
from .models import User

@csrf_exempt
def log_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        print(username)
        print(password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            user_d = {
                'pseudo': user.pseudo,
                'loss': user.loss,
            }
            print(token.key)
            return JsonResponse({
                'token': token.key,
                'data': user_d,
            })
        else:
            return JsonResponse({'error': 'Invalide login credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def is_auth(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        print(data)

def user_detail(request):
    if request.method == 'GET':
        user = request.user
        print(user)
        return JsonResponse({'result': 'Bravo :)'});