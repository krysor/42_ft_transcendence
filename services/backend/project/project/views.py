from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ReactAppView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"answer": 42}, status=status.HTTP_200_OK)

def index(request):
    nav_content = """
    <nav>
        <a href="/">Home</a>
        <a href="game/">play pong</a>
    </nav>
    """
    return render(request, 'index.html', {'nav_content': nav_content})

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