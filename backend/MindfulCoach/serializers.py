# serialize (translate) from SQL data objects to JSON format readable to REACT
from rest_framework import serializers
# later for models from .models import User
# Built in models for Users and Groups
from .models import Appointment
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'groups']


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['date', 'time', 'coach', 'client']


class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(self)
        print(validated_data)

        if validated_data['is_staff']:
            user = User.objects.create_superuser(
                validated_data['username'], validated_data['email'], validated_data['password'])
            user.is_superuser = False
            print(f"Is super user: {user.is_superuser}")
            return user
        else:
            user = User.objects.create_user(
                validated_data['username'], validated_data['email'], validated_data['password'])
            return user
