from rest_framework import serializers
from api.models import Person

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'