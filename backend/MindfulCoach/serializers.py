# serialize (translate) from SQL data objects to JSON format readable to REACT
from rest_framework import serializers
# later for models from .models import User
# Built in models for Users and Groups
from .models import Appointment, ClientProfile, CoachProfile
from django.contrib.auth.models import User


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AppointmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class ClientProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ClientProfile
        fields = "__all__"


class CoachProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CoachProfile
        fields = "__all__"


class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'first_name', 'last_name',
                  'username', 'email', 'password', 'is_staff']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(self)
        print(validated_data)

        if validated_data['is_staff']:
            user = User.objects.create_superuser(
                validated_data['username'], validated_data['email'], validated_data['password'])
            user.is_superuser = False
            user.first_name = validated_data['first_name']
            user.last_name = validated_data['last_name']
            user.save()
            print(f"Is super user: {user.is_superuser}")
            return user
        else:
            user = User.objects.create_user(
                validated_data['username'], validated_data['email'], validated_data['password'])
            return user
