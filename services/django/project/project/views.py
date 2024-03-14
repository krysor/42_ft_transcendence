from django.shortcuts import render
from django.http import HttpResponse

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