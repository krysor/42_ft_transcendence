from rest_framework import serializers
from .models import User, Match, Score, MorpionParties

class UserSerializer(serializers.ModelSerializer):
	class Meta(object):
		model = User
		fields = ['id', 'username', 'loss', 'win', 'profile_pic', 'friends', 'is_online']

class MatchSerializer(serializers.ModelSerializer):
	class Meta(object):
		model = Match
		fields = ['player1_id', 'player1_name', 'player2_id', 'player2_name', 'player1_score', 'player2_score', 'winner_id', 'winner_name', 'is_pong']

class ScoreSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	
	class Meta(object):
		model = Score
		fields = ['user', 'score'] 

class MorpionSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	
	class Meta(object):
		model = MorpionParties
		fields = ['user', 'oponent', 'date', 'winner']