from rest_framework import serializers
from .models import User, Match, Score, MorpionParties

class MatchSerializer(serializers.ModelSerializer):
	class Meta(object):
		model = Match
		fields = ['id', 'p1_id', 'p1_name', 'p2_id', 'p2_name', 'date', 'p1_score', 'p2_score', 'winner_id', 'winner_name', 'is_pong']

class UserSerializer(serializers.ModelSerializer):
    matches = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'loss', 'win', 'profile_pic', 'friends', 'is_online', 'matches']

    def get_matches(self, obj):
        matches = Match.objects.filter(p1_id=obj.id) | Match.objects.filter(p2_id=obj.id)
        return MatchSerializer(matches, many=True).data

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