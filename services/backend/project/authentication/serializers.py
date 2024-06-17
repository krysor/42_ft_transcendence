from rest_framework import serializers
from .models import User, Match, Score, MorpionParties

from rest_framework import serializers
from .models import User, Match

class UserShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'profile_pic']

class MatchSerializer(serializers.ModelSerializer):
    p1 = UserShortSerializer(read_only=True)
    p2 = UserShortSerializer(read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'p1', 'p2', 'date', 'p1_score', 'p2_score', 'winner_id', 'is_pong']

class UserSerializer(serializers.ModelSerializer):
    matches = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'loss', 'win', 'profile_pic', 'friends', 'is_online', 'language', 'matches']

    def get_matches(self, obj):
        matches_as_p1 = Match.objects.filter(p1=obj.id)
        matches_as_p2 = Match.objects.filter(p2=obj.id)
        all_matches = matches_as_p1 | matches_as_p2
        return MatchSerializer(all_matches, many=True).data

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