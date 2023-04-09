from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import json
from datetime import datetime
from datetime import date
from datetime import time, timedelta
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

import subprocess
import os
from django.http import JsonResponse

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
        return self.queryset
        # Only return objects that belong to the authenticated user
        # if (self.request.user.is_staff == 1):
        #     coach = CoachProfile.objects.get(user=self.request.user.id)
        #     return self.queryset.filter(coach=coach)
        # else:
        #     returnObj = []
        #     client = ClientProfile.objects.get(user=self.request.user.id)
        #     return self.queryset.filter(client=client)


# Register API: Endpoint accessible to REACT frontend


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAppointments(request):
    print(request.user.first_name)
    print("hello there")
    Appointments = Appointment.objects.all()
    if (request.user.is_staff == 1):
        coach = CoachProfile.objects.get(user=request.user.id)
        data = AppointmentSerializer(Appointment.objects.filter(
            client=client), many=True, context={'request': request}).data,
    else:
        returnObj = []
        client = ClientProfile.objects.get(user=request.user.id)
        data = AppointmentSerializer(Appointment.objects.filter(client=client), many=True, context={'request': request}).data,
    returnObj = {
        "appointments" : data,
    }
    print(returnObj)
    return JsonResponse(returnObj, status=200)

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # is_staff = request.data.get('is_staff', False)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return JsonResponse({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


@csrf_exempt
def AvailableAppointments(request):
    daysOfWeek = [0, 1, 2, 3, 4]
    hours = [9, 10, 11, 12, 13, 14, 15, 16, 17]

    # First update appointments
    todaysDate = date.today()
    print(todaysDate)
    # todaysDate = datetime.strptime(todaysDate, "%Y-%m-%d").date()

    # Delete any appointments in the past without a client
    EmptyAppointments = Appointment.objects.filter(client=None)
    for appointment in EmptyAppointments:
        if (appointment.date < todaysDate):
            appointment.delete()

    # Update all coaches appointments to ensure they have appointments available for the next week

    Coaches = CoachProfile.objects.all()
    allAppointments = Appointment.objects.all()

    for coach in Coaches:
        # Attempt to create appointments for the next week if they are not already there
        for daysAhead in range(15):
            futureDate = date.today() + timedelta(days=daysAhead)
            for hour in hours:
                hourOfAppointment = time(hour, 00)
                if not (allAppointments.filter(coach=coach, date=futureDate, time=hourOfAppointment).exists()):
                    # print(
                    #     f"This appointment for {coach} does not exist {futureDate} at {hourOfAppointment}")
                    if (futureDate.weekday() in daysOfWeek):
                        newAppt = Appointment(
                            coach=coach, date=futureDate, time=hourOfAppointment)
                        newAppt.save()

    availableAppointments = []

    # Delete all appointments for testing
    # for appt in allAppointments:
    #     appt.delete()

    for Coach in Coaches:
        info = {
            "firstName": Coach.user.first_name,
            "lastName": Coach.user.last_name,
            "bio": Coach.bio,
            "education": Coach.education,
            "appointments": AppointmentSerializer(Appointment.objects.filter(coach=Coach).filter(client=None), many=True, context={'request': request}).data,
        }
        availableAppointments.append(info)

    returnObj = {
        "AppointmentsByCoach": availableAppointments
    }

    # print(returnObj)
    # Return an error response if the request method or content type is not correct
    # error_data = {
    #     'error': 'valid request'
    # }
    return JsonResponse(returnObj, status=200)


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
        # Example string to be converted
        string_date = data['expiry']
        # Define the format string
        format_string = '%Y-%m-%dT%H:%M:%S.%fZ'
        # Convert the string to a datetime object
        date_object = datetime.strptime(string_date, format_string)
        cookie = {
            'Authorization': f"{data['token']}",
            'Expires': date_object
        }
        return JsonResponse(cookie)

# Chatbot API endpoint


@csrf_exempt
def ChatBotView(request):

    if request.method == 'POST' and request.content_type == 'application/json':
        # Get the JSON data from the request body
        ChatbotInput = json.loads(request.body)

        # Save current working directory
        original_dir = os.getcwd()

        # construct the path to the script file
        # script_path = os.path.join(current_dir, 'ChatBot', 'chat.py')
        chatbot_dir = os.path.join(os.path.dirname(
            os.path.abspath(__file__)), 'ChatBot')
        os.chdir(chatbot_dir)

        # chatbotResponse = subprocess.check_output(
        #     ['python3', "chat.py"])
        # Start subprocess
        process = subprocess.Popen(
            ['python3', 'chat.py'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

        # Send input to subprocess

        input_data = ChatbotInput["input"]
        input_data += "\n"

        print('Input data:', input_data)
        process.stdin.write(input_data.encode())
        process.stdin.flush()

        # Get output from subprocess
        output_data = process.stdout.readline().decode()

        # Print output and error data from subprocess
        print('Output data:', output_data)

        # Terminate subprocess
        process.terminate()

        # Change back to original directory
        os.chdir(original_dir)

        # Create a response JSON object
        response_data = {
            'status': 'success',
            'ChatBotResponse': output_data
        }
        # Return the response as JSON
        return JsonResponse(response_data)

    else:
        # Return an error response if the request method or content type is not correct
        error_data = {
            'error': 'Invalid request'
        }
        return JsonResponse(error_data, status=400)


# initial csrf token


@csrf_exempt
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})
