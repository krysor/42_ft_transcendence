# import os

# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.core.asgi import get_asgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ft_transcendence.settings")
# django_asgi_app = get_asgi_application()


# application = ProtocolTypeRouter(
#     {
#         "http": django_asgi_app,
#     }
# )


# asgi.py
import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from .middleware import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')

django.setup()
django_asgi_app = get_asgi_application()
from project.routing import websocket_urlpatterns
import project.routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        TokenAuthMiddleware(
            URLRouter(
                websocket_urlpatterns
            )
        )
    ),
})
