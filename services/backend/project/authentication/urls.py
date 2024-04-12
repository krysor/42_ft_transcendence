from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import log_user, user_detail, signup, logout, all_users, add_friend

urlpatterns = [
    path('login/', log_user),
    path('signup/', signup),
    path('user_detail/', user_detail),
    path('logout/', logout),
    path('all/', all_users),
    path('add_friend/<int:friend_id>/', add_friend, name='add_friend'),
]