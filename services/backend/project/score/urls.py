from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import update_score, get_top_score, update_parties, get_parties, update_match, update_score_by_id, update_parties_by_id

urlpatterns = [
    path('update_score/', update_score),
    path('get_top_score/', get_top_score),
    path('update_parties/', update_parties),
    path('get_parties/', get_parties),
    path('update_match/', update_match),
    path('update_parties_by_id/', update_parties_by_id),
    path('update_score_by_id/', update_score_by_id),
]