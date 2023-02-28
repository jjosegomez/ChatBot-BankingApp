from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
# Built in models for Users and Groups
from django.contrib.auth.models import User, Group


# Create your models here.
class ClientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    print(
        f"This is the instance created: {instance}\n sender: {sender}\n created: {created}")
    if created:
        self = ClientProfile.objects.create(user=instance)
        # print(self.id)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    print(instance)
    instance.clientprofile.save()


# IN PROGRESS: (Primary key/id is automatically generated) This model will be the table that stores the appointments
# class User(models.Model):  # This model is just a test model - ensures everything from backend is connected to frontend
#     GENDERS = (
#         ('M', 'Male'),
#         ('F', 'Female'),
#         ('O', 'Other'),
#     )
#     username = models.CharField(max_length=64, primary_key=True)
#     password = models.CharField(max_length=20)
#     firstName = models.CharField(max_length=64)
#     lastName = models.CharField(max_length=64)
#     email = models.EmailField(unique=True)
#     address = models.CharField(max_length=256)
#     gender = models.CharField(max_length=1, choices=GENDERS)
#     DOB = models.DateField()

#     class Meta:
#         abstract = True


# class patient (User):

#     def __str__(self):  # Return string representation of the object
#         return f"{self.firstName} {self.lastName}"


# class coach (User):

#     def __str__(self):  # Return string representation of the object
#         return f"{self.firstName} {self.lastName}"
#     #Appointment = models.ManyToManyField(Appointment)


# class Appointment(models.Model):
#     date = models.DateField()
#     time = models.TimeField()
#     coach = models.ForeignKey(coach, on_delete=models.CASCADE)
#     patient = models.ForeignKey(patient, on_delete=models.CASCADE)

#     def __str__(self):  # Return string representation of the object
#         return f"time:{self.time} date:{self.date} coach:{self.coach} patient:{self.patient}"
