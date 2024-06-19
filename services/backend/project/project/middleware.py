# middleware.py
import django
django.setup()
from channels.middleware import BaseMiddleware
from channels.db import database_sync_to_async
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AnonymousUser

@database_sync_to_async
def get_user(scope):
    try:
        token = scope.get("query_string").decode("utf-8").split("=")[1]
        return Token.objects.get(key=token).user
    except (Token.DoesNotExist, IndexError):
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        scope["user"] = await get_user(scope)
        return await super().__call__(scope, receive, send)
