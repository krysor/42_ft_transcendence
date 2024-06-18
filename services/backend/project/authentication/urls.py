from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.conf import settings

from .views import update_online_status, ft_login, log_user, user_detail, signup, logout, all_users, add_friend, profile_pic, edit_profile, get_user_by_id, friend_list, remove_friend

urlpatterns = [
    path('login/', log_user),
    path('signup/', signup),
    path('user_detail/', user_detail),
    path('get_user_by_id/<int:user_id>', get_user_by_id),
    path('logout/', logout),
    path('all/', all_users),
    path('add_friend/<int:friend_id>/', add_friend, name='add_friend'),
    path('remove_friend/<int:friend_id>/', remove_friend, name='remove_friend'),
    path('edit_profile/', edit_profile),
    path('profile_pic/<str:filename>/', profile_pic),
    path('friend_list/', friend_list),
    path('42_auth/', ft_login),
    path('update_online_status/', update_online_status, name='update_online_status'),
]