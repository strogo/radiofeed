# Generated by Django 3.1.3 on 2020-12-19 13:25

# Django
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("podcasts", "0003_auto_20201217_2126"),
    ]

    operations = [
        migrations.AlterField(
            model_name="podcast",
            name="itunes",
            field=models.URLField(blank=True, max_length=500, null=True, unique=True),
        ),
    ]
