from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import ClientProfile, CoachProfile, Appointment

# Register your models here


# Define a new admin class for the User model
class CustomUserAdmin(UserAdmin):
    pass


# Register the User model with the new admin class
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

admin.site.register(ClientProfile)
admin.site.register(CoachProfile)
admin.site.register(Appointment)
