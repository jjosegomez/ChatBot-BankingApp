# Generated by Django 4.2 on 2023-04-04 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MindfulCoach', '0004_alter_appointment_client'),
    ]

    operations = [
        migrations.AddField(
            model_name='coachprofile',
            name='education',
            field=models.TextField(blank=True, max_length=60),
        ),
        migrations.AlterField(
            model_name='clientprofile',
            name='bio',
            field=models.TextField(blank=True, max_length=240),
        ),
        migrations.AlterField(
            model_name='coachprofile',
            name='bio',
            field=models.TextField(blank=True, max_length=240),
        ),
    ]
