from django.db import models
from django.core.validators import RegexValidator   # for phone number validation

# Create your models here.


class User(models.Model):  # This model is just a test model - ensures everything from backend is connected to frontend
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)

    def __str__(self):  # Return string representation of the object
        return f"{self.firstName} {self.lastName}"


# IN PROGRESS: (Primary key/id is automatically generated) This model will be the table that stores the appointments
class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()


class Customer(models.Model):  # IN PROGRESS: (Primary key/id is automatically generated) This model will be the table that stores each customer user for the app
    username = models.CharField(unique=True, max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    password = models.CharField(max_length=32)
    birth_date = models.DateField(blank=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, blank=True)  # Validators should be a list
