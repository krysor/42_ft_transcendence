from django.contrib.auth.forms import UserCreationForm
from .models import User

class LoginForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'pseudo', 'loss', 'win', 'profile_pic']