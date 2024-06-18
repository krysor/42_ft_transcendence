# consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
import asyncio
from authentication.models import User

class PingPongConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        if self.user.is_anonymous:
            await self.close()
        else:
            # Marquer l'utilisateur comme en ligne
            await self.update_user_status(self.user, True)
            await self.channel_layer.group_add("online_users", self.channel_name)
            await self.accept()
            asyncio.create_task(self.send_pings())

    async def disconnect(self, close_code):
        # Marquer l'utilisateur comme hors ligne
        await self.update_user_status(self.user, False)
        await self.channel_layer.group_discard("online_users", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("type") == "pong":
            await self.update_user_status(self.user, True)

    async def send_pings(self):
        while True:
            await self.send(text_data=json.dumps({"type": "ping"}))
            await asyncio.sleep(10)  # Envoyer un ping toutes les 10 secondes

    @database_sync_to_async
    def update_user_status(self, user, is_online):
        user.is_online = is_online
        user.save()
