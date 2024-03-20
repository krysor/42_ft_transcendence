from django.shortcuts import render
from django.http import HttpResponse

def main_js(request):
    js_content = """
    <script src="/static/js/config.js" refer></script>
    <script src="/static/js/loadPage.js"refer></script>
    <script src="/static/js/main.js"refer></script>
    """

    return render(request, 'index.html', {'js_content': js_content})