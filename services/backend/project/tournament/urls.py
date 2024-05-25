from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import log_user, add_match

urlpatterns = [
    path('login/', log_user),
    path('add_match_to_historic/', add_match)
]