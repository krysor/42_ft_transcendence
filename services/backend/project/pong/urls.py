from django.urls import path
from .views import main_js

urlpatterns = [
    path('', main_js),
]