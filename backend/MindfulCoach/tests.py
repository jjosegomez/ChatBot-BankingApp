from django.test import TestCase

# Create your tests here.
import requests
import json

token = ""
# Set the Authorization header with the Knox token
headers = {
    "Authorization": ""
}

loginHeader = {"Content-Type": "application/json"}
baseURL = "http://127.0.0.1:8000/api/"

user = {
    "username": "test2@example.com",
    "email": "test2@example.com",
    "password": "test2@example.com",
}
user = json.dumps(user)
print(user)


def loginTest():
    url = baseURL + "login/"
    response = requests.post(url, data=user, headers=loginHeader)
    token = response.cookies.get('Authorization')
    global headers
    headers["Authorization"] = f"Token {token}"
    print("\nLogin Viewset test: ")
    print(response.status_code)


def userGetTest():

    # Replace with the URL of your API endpoint
    url = baseURL + "users/"
    # Send an HTTP GET request to the endpoint
    response = requests.get(
        url, headers=headers)
    # Check the response status code and content
    print("\nUser Viewset test: ")
    print(response.status_code)
    print(response.json())


def profileGetTest():

    # Replace with the URL of your API endpoint
    url = baseURL + "coachprofile/"
    # Send an HTTP GET request to the endpoint
    response = requests.get(
        url, headers=headers)
    # Check the response status code and content
    print("\nCoachProfile Viewset test: ")
    print(response.status_code)
    print(response.json())


def getAppointmentsTest():
    # Replace with the URL of your API endpoint
    url = baseURL + "appointments/"
    # Send an HTTP GET request to the endpoint
    response = requests.get(
        url, headers=headers)
    # Check the response status code and content
    print("\nAppointments Viewset test: ")
    print(response.status_code)
    print(response.json())


def logoutTest():
    # Replace with the URL of your API endpoint
    url = baseURL + "/logout/"
    # Send an HTTP GET request to the endpoint
    response = requests.post(
        url, headers=headers)
    # Check the response status code and content
    print("\nLogout Viewset test: ")
    print(response.status_code)
    # print(response.json())


loginTest()
print(headers)

userGetTest()
profileGetTest()
getAppointmentsTest()
# logoutTest()
