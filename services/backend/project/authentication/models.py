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
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='match_history')
	oponent = models.CharField(max_length=20, verbose_name='oponent')
	date = models.DateField(verbose_name='date of the match')
	winner = models.BooleanField(default=True)
