from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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