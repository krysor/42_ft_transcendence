from rest_framework import serializers
from .models import User, Match

class UserSerializer(serializers.ModelSerializer):
	class Meta(object):
		model = User
		fields = ['id', 'username', 'loss', 'win', 'profile_pic', 'friends', 'is_online']