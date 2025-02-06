# Generated by Django 5.1.4 on 2025-01-25 10:39

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0003_alter_jobseeker_user"),
    ]

    operations = [
        migrations.AlterField(
            model_name="jobseeker",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="jobseeker_profile",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
