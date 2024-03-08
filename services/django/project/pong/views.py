from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def main_js(request):
    js_content = """
    <script src="/static/js/config.js" refer></script>
    <script src="/static/js/loadPage.js"refer></script>
    <script src="/static/js/main.js"refer></script>
    """

    # Rendre le template index.html avec le contenu JavaScript inclus
    return render(request, 'index.html', {'js_content': js_content})