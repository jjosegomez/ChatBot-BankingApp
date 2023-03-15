from django.test import TestCase

# Create your tests here.
import requests
import json


def userGetTest():
    # Replace with the URL of your API endpoint
    url = "http://localhost:8000/api/users/5/"

    # Replace with a valid Knox token for a user with the correct permissions
    token = "1e15b3f16c306f2dbe599f285eb824e6358c639795ac1a21b05874fa9c1d273f5ad1cfbc95985a26042b3344a018a91bcedaf3e68fe53165e87f02974907aed0"

    # Set the Authorization header with the Knox token
    headers = {
        "Authorization": f"Token {token}"
    }

    # Send an HTTP GET request to the endpoint
    response = requests.get(url, headers=headers)

    # Check the response status code and content
    print(response.status_code)
    print(response.json())


def groupGetTest():
    # Replace with the URL of your API endpoint
    url = "http://localhost:8000/api/groups/"

    # Replace with a valid Knox token for a user with the correct permissions
    token = "9d89f909d00ee6408ee753b17772dc98b30c8d6b571c3ecca3304bfc1da2fcc1"

    # Set the Authorization header with the Knox token
    headers = {
        "Authorization": f"Token {token}"
    }

    # Send an HTTP GET request to the endpoint
    response = requests.get(url, headers=headers)

    # Check the response status code and content
    print(response.status_code)
    print(response.json())


userGetTest()
