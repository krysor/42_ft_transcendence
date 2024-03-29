from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from rest_framework import generics
from api.models import Person
from .serializers import MyModelSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token

@csrf_exempt
def react_app_view(request, *args, **kwargs):
    data = JsonResponse({"answer": 42})
    data['Access-Control-Allow-Origin'] = '*'
    data['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    data['Access-Control-Allow-Headers'] = 'Content-Type'
    return data

def index(request):
    nav_content = """
    <nav>
        <a href="/">Home</a>
        <a href="game/">play pong</a>
    </nav>
    """
    return render(request, 'index.html', {'nav_content': nav_content})

@csrf_exempt
def main_js(request):
    js_content = """
    <script src="/static/js/config.js" refer></script>
    <script src="/static/js/loadPage.js"refer></script>
    <script src="/static/js/main.js"refer></script>
    """
    nav_content = """
    <nav>
        <a href="/">Home</a>
        <a href="./">play pong</a>
    </nav>
    """
    return render(request, 'index.html', {'js_content': js_content, 'nav_content': nav_content})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def login(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    # token = Token.objects.create(user=request.user)
    # print(token.key)
    return Response(content)
