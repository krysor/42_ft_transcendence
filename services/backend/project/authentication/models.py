from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
	loss = models.IntegerField(null=False, default=0, verbose_name='number of lost game')
	win = models.IntegerField(null=False, default=0, verbose_name='number of games won')
	profile_pic = models.ImageField(verbose_name='profile pic', default='default_pp.jpeg')
	friends = models.ManyToManyField('self', symmetrical=False, related_name='friend_list', blank=True)
	is_online = models.BooleanField(default=False)
	is_student = models.BooleanField(default=False)
	language = models.CharField(default='eng')

class Match(models.Model):
	p1 = models.ForeignKey(User, related_name='player1_matches', on_delete=models.SET_NULL, null=True, blank=True)
	p2 = models.ForeignKey(User, related_name='player2_matches', on_delete=models.SET_NULL, null=True, blank=True)
	date = models.DateField()
	p1_score = models.IntegerField()
	p2_score = models.IntegerField()
	winner_id = models.IntegerField(null=True, blank=True)
	is_pong = models.BooleanField(default=False)

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
