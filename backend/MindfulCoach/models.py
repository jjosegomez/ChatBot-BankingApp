from django.db import models
from django.core.validators import RegexValidator   # for phone number validation

# Create your models here.


class UserEx(models.Model):  # This model is just a test model - ensures everything from backend is connected to frontend
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)

    def __str__(self):  # Return string representation of the object
        return f"{self.firstName} {self.lastName}"


# IN PROGRESS: (Primary key/id is automatically generated) This model will be the table that stores the appointments
class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()

    
