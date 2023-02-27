# serialize (translate) from SQL data objects to JSON format readable to REACT
from rest_framework import serializers
# later for models from .models import User
from django.contrib.auth.models import User, Group # Built in models for Users and Groups

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'groups']
        

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

# Register Serializer
class RegisterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(self)
        print(validated_data)
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        my_group = Group.objects.get(name='Customers') 
        my_group.user_set.add(user)
        return user