from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.core.serializers import serialize
from django.conf import settings
from django.core.files.base import ContentFile
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

import json
import requests
import os
import re

from authentication.serializers import UserSerializer, MatchSerializer, ScoreSerializer, MorpionSerializer
from authentication.models import User, Score, MorpionParties

# create or modify a database entry for the user's score
@api_view(['POST'])
def update_score(request):
    user = request.user
    obj = Score.objects.get_or_create(user=user)[0]
    obj.score += request.data['points']
    obj.save()
    serialized = UserSerializer(user)
    return JsonResponse({'user': serialized.data})

# get the top 10 scores
@api_view(['GET'])
def get_top_score(request):
    scores = Score.objects.all().order_by('-score')[:10]
    serialized = ScoreSerializer(scores, many=True)
    return JsonResponse({'scores': serialized.data})

# create a database entry for the user's parties
@api_view(['POST'])
def update_parties(request):

    user = request.user
    oponent = request.data['oponent']
    data = request.data['points']

    obj = MorpionParties.objects.create(user=user, oponent=oponent, winner=data)[0]
    serialized = MorpionSerializer(data=request.data)
    serialized.save(user)

    return JsonResponse({'success': 'Party saved'})

# get the parties of the user
@api_view(['GET'])
def get_parties(request):
    parties = MorpionParties.objects.all().order_by('-date')
    serialized = MorpionSerializer(parties, many=True)
    return JsonResponse({'scores': serialized.data})

# create a database entry for the match
@api_view(['POST'])
def update_match(request):
    player1_id = request.data['player1_id']
    player1_name = request.data['player1_name']
    player2_id = request.data['player2_id']
    player2_name = request.data['player2_name']
    player1_score = request.data['player1_score']
    player2_score = request.data['player2_score']
    winner_id = request.data['winner_id']
    winner_name = request.data['winner_name']
    is_pong = True

    obj = Match.objects.create(player1_id=player1_id, player1_name=player1_name, player2_id=player2_id, player2_name=player2_name, player1_score=player1_score, player2_score=player2_score, winner_id=winner_id, winner_name=winner_name, is_pong=is_pong)
    serialized = MatchSerializer(obj)
    serialized.save()
    return JsonResponse({'match': serialized.data})

@api_view(['POST'])
def update_parties_by_id(request):

    user = get_object_or_404(User, id=request.data['winnerId'])
    oponent = request.data['oponent']
    data = request.data['points']

    obj = MorpionParties.objects.create(user=user, oponent=oponent, winner=data)[0]
    serialized = MorpionSerializer(data=request.data)
    serialized.save(user)

    return JsonResponse({'success': 'Party saved'})
    
@api_view(['POST'])
def update_score_by_id(request):
    user = get_object_or_404(User, id=request.data.get('playerId'))
    obj, created = Score.objects.get_or_create(user=user)
    obj.score += request.data['points']
    obj.save()

    return Response({'message': 'Score updated successfully'})