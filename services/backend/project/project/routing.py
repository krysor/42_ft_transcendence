# routing.py
from django.urls import re_path
from .consumers import PingPongConsumer

websocket_urlpatterns = [
    re_path(r'ws/pingpong/$', PingPongConsumer.as_asgi()),
]
