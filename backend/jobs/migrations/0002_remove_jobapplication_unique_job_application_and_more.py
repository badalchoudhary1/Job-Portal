# Generated by Django 5.1.4 on 2025-01-16 10:17

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0001_initial"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="jobapplication",
            name="unique_job_application",
        ),
        migrations.RemoveField(
            model_name="job",
            name="applicants",
        ),
        migrations.AddField(
            model_name="job",
            name="applicant",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterUniqueTogether(
            name="jobapplication",
            unique_together={("job", "applicant")},
        ),
    ]
