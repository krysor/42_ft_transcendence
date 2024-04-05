from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token

from django.http import JsonResponse
from django.contrib.auth import authenticate
import json
from . import forms
from authentication.models import User
from django.core.serializers import serialize

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
            token, created = Token.objects.get_or_create(user=user)
            # userobj = User.objects.get(username=username)
            # serial_user = serialize('json', [userobj], fields=('username', 'password'))
            return JsonResponse({
                'token': token.key,
                'user': serial_user,
            })
        else:
            return JsonResponse({'error': 'Invalide login credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def is_auth(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        print(data)

@login_required
def user_detail(request):
    if request.method == 'GET':
        user = request.user
        print(user)
        return JsonResponse({'username': user.username})

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        serial_user = serialize('json', [user], fields=('username', 'password'))
        return JsonResponse({'message': 'User registered successfully',
                            'user': serial_user})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)