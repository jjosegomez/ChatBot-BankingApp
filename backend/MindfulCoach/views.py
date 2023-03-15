from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions, generics
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, AppointmentSerializer
from django.contrib.auth.models import User
from .models import Appointment

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
#    "username": "draco",
#   "email": "draco@example.com",
#   "password": "12345678!"
# }
# "url": "http://127.0.0.1:8000/api/users/5/",

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


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
        return super(LoginAPI, self).post(request, format=None)
