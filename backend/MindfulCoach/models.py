from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


class ClientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=240, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


class CoachProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    education = models.TextField(max_length=60, blank=True)
    bio = models.TextField(max_length=240, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    print(
        f"This is the instance created: {instance}\n sender: {sender}\n created: {created}")
    if created and instance.is_staff:
        CoachProfile.objects.create(user=instance)
    elif created:
        ClientProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, created, **kwargs):
    print(instance)
    if created and instance.is_staff:
        instance.coachprofile.save()
    elif created:
        instance.clientprofile.save()


class Appointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    coach = models.ForeignKey(CoachProfile, on_delete=models.CASCADE)
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):  # Return string representation of the object
        return f"time:{self.time} date:{self.date} coach:{self.coach} patient:{self.client}"
