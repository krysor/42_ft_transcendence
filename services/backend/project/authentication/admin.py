from django.contrib import admin

# Register your models here.
from authentication.models import User, Score, MorpionParties

admin.site.register(User)
admin.site.register(Score)
admin.site.register(MorpionParties)
