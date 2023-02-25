from django.db import models
from django.core.validators import RegexValidator   # for phone number validation
from django.contrib.auth.models import User, Group # Built in models for Users and Groups

# Create your models here.


class UserEx(models.Model):  # This model is just a test model - ensures everything from backend is connected to frontend
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    Appointment = models.ManyToManyField(Appointment)

    def __str__(self):  # Return string representation of the object
        return f"{self.firstName} {self.lastName}"


# IN PROGRESS: (Primary key/id is automatically generated) This model will be the table that stores the appointments
class User(models.Model):  # This model is just a test model - ensures everything from backend is connected to frontend
    GENDERS =(
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    username = models.CharField(max_length=64, primary_key=True)
    password = models.CharField(max_length=20)
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=256)
    gender = models.CharField(max_length=1, choices=GENDERS)
    DOB = models.DateField()

    class Meta:
        abstract = True

class patient (User):

    def __str__(self):  # Return string representation of the object
        return f"{self.firstName} {self.lastName}"

class coach (User):

    def __str__(self):  # Return string representation of the object
        return f"{self.firstName} {self.lastName}"
    #Appointment = models.ManyToManyField(Appointment)

    
    
    

class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    coach = models.ForeignKey(coach, on_delete= models.CASCADE)
    patient = models.ForeignKey(patient, on_delete= models.CASCADE)

    def __str__(self):  # Return string representation of the object
        return f"time:{self.time} date:{self.date} coach:{self.coach} patient:{self.patient}"

    
