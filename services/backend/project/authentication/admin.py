from django.contrib import admin

# Register your models here.
from authentication.models import User, Score, MorpionParties, Match

admin.site.register(User)
admin.site.register(Score)
admin.site.register(Match)
admin.site.register(MorpionParties)
