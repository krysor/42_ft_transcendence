from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=20, label='username')
    password = forms.CharField(max_length=63, widget=forms.PasswordInput, label='password')