from django.contrib import admin
from .models import User

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ("firstName", "lastName")


# Register the User and UserAdmin models
admin.site.register(User, UserAdmin)
