from rest_framework import serializers
from .models import User, Match

class UserSerializer(serializers.ModelSerializer):
	class Meta(object):
		model = User
		fields = ['id', 'username', 'loss', 'win', 'profile_pic', 'friends', 'is_online']

	def validate_username(self, value):
		if len(value) > 20:
			raise serializers.ValidationError("The username must contain at least 5 characters.")
		return value