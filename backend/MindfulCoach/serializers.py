# serialize (translate) from SQL data objects to JSON format readable to REACT
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('firstName', 'lastName')
