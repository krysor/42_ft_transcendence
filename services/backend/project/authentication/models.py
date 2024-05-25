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
	date = models.DateField(auto_now_add=True, verbose_name='date of the match', null=False)
	player1_score = models.IntegerField(verbose_name='score of player 1', default=0)
	player2_score = models.IntegerField(verbose_name='score of player 2', default=0)
	winner_id = models.IntegerField(verbose_name='ID of the winner', default=0)
	winner_name = models.CharField(max_length=255, verbose_name='Name of the winner', default='')
	is_pong = models.BooleanField(default=True)

class Score(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='score')
	score = models.IntegerField(null=False, default=0, verbose_name='score')

	def __str__(self):
		return f"{self.user.username} - {self.score}"
	
class MorpionParties(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='morpion_parties')
	oponent = models.CharField(max_length=20, verbose_name='oponent')
	date = models.DateTimeField(auto_now_add=True, verbose_name='date of the match')
	winner = models.IntegerField(null=False, default=0, verbose_name='state')

	def __str__(self):
		return f"{self.user.username} - {self.oponent} - {self.winner}"
