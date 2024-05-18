from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import log_user, user_detail, signup, logout, all_users, add_friend, profile_pic, edit_profile, get_user_by_id, update_score, get_top_score

urlpatterns = [
    path('login/', log_user),
    path('signup/', signup),
    path('user_detail/', user_detail),
    path('update_score/', update_score),
    path('get_top_score/', get_top_score),
    path('get_user_by_id/<int:user_id>', get_user_by_id),
    path('logout/', logout),
    path('all/', all_users),
    path('add_friend/<int:friend_id>/', add_friend, name='add_friend'),
    path('edit_profile/', edit_profile),
    path('profile_pic/<str:filename>/', profile_pic),
]