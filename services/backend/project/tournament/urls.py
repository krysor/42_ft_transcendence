from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import log_user, add_match, get_all_matches, get_user_matches, ft_login_tournament

urlpatterns = [
    path('login/', log_user),
    path('add_match_to_historic/', add_match),
    path('all_matches/', get_all_matches),
    path('matches/<int:user_id>/', get_user_matches),
    path('ft_login/', ft_login_tournament),
]