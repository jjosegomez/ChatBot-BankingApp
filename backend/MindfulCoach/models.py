from django.db import models

# Create your models here.

class User(models.Model):
    firstName = models.CharField(max_length=64);
    lastName = models.CharField(max_length=64);

    def __str__(self):
        return f"{self.firstName} {self.lastName}"