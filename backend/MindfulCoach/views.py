from django.shortcuts import render
import json
from datetime import datetime
from rest_framework import viewsets
from rest_framework import permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, AppointmentSerializer, CoachProfileSerializer, ClientProfileSerializer
from django.contrib.auth.models import User
from django.http import HttpResponse
from .models import Appointment, CoachProfile, ClientProfile

from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import TokenAuthentication
from knox.views import LoginView as KnoxLoginView


# Create your views here.
# {
#    "expiry": "2023-02-26T05:27:00.540643Z",
#    "token": "18a3e5c8b84fc6f2da0556da9424b18bc87955c049060b0bfe82c9e40a2cce11"
# }
# {
#     "username": "coach1@example.com",
#    "email": "coach1@example.com",
#    "password": "coach1@example.com"
# }
# "url": "http://127.0.0.1:8000/api/users/5/",

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        # Only return objects that belong to the authenticated user
        return self.queryset.filter(id=self.request.user.id)


class CoachPofileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = CoachProfile.objects.all()
    serializer_class = CoachProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        # Only return objects that belong to the authenticated user
        return self.queryset.filter(user=self.request.user.id)

class ClientPofileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        # Only return objects that belong to the authenticated user
        return self.queryset.filter(user=self.request.user.id)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.id)
        # Only return objects that belong to the authenticated user
        if (self.request.user.is_staff == 1):
            coach = CoachProfile.objects.get(user=self.request.user.id)
            return self.queryset.filter(coach=coach)
        else:
            client = ClientProfile.objects.get(user=self.request.user.id)
            return self.queryset.filter(client=client)


# Register API: Endpoint accessible to REACT frontend
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        #is_staff = request.data.get('is_staff', False)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):  # Login API: Endpoint accessible to REACT frontend
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(LoginAPI, self).post(request, format=None)
        data = response.data
        print(f"Token: {data['token']}")
        returnResponse = HttpResponse()
        # Example string to be converted
        string_date = data['expiry']
        # Define the format string
        format_string = '%Y-%m-%dT%H:%M:%S.%fZ'
        # Convert the string to a datetime object
        date_object = datetime.strptime(string_date, format_string)
        returnResponse.set_cookie(
            key='Authorization', value=f"{data['token']}", expires=date_object)
        # print(token)
        return returnResponse
