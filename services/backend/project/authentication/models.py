from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	loss = models.IntegerField(null=False, default=0, verbose_name='number of lost game')
	win = models.IntegerField(null=False, default=0, verbose_name='number of games won')
	profile_pic = models.ImageField(verbose_name='profile pic', default='default_pp.jpeg')
	friends = models.ManyToManyField('self', symmetrical=False, related_name='friend_list', blank=True)
	is_online = models.BooleanField(default=False)
	is_student = models.BooleanField(default=False)

class Match(models.Model):
    player1_id = models.IntegerField(verbose_name='ID of player 1', default=0)
    player1_name = models.CharField(max_length=255, verbose_name='Name of player 1', default='')
    player2_id = models.IntegerField(verbose_name='ID of player 2', default=0)
    player2_name = models.CharField(max_length=255, verbose_name='Name of player 2', default='')
    date = models.DateField(verbose_name='date of the match', null=False)
    player1_score = models.IntegerField(verbose_name='score of player 1', default=0)
    player2_score = models.IntegerField(verbose_name='score of player 2', default=0)
    winner_id = models.IntegerField(verbose_name='ID of the winner', default=0)
    winner_name = models.CharField(max_length=255, verbose_name='Name of the winner', default='')
    is_pong = models.BooleanField(default=True)
