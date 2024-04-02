from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
from django.http import JsonResponse
from django.contrib.auth import authenticate

from . import forms

@csrf_exempt
def login_page(request):
    if request.method == 'POST':
        form = forms.LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # Authentification réussie
                return JsonResponse({'success': True})
            else:
                # Authentification échouée
                return JsonResponse({'success': False, 'error': 'Invalid username or password'}, status=400)
        else:
            # Formule invalide
            return JsonResponse({'success': False, 'error': 'Invalid form data'}, status=400)
    else:
        # Requête non valide
        return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)