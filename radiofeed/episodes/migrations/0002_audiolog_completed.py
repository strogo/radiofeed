# Generated by Django 3.1.3 on 2020-12-21 14:51

# Django
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("episodes", "0001_squashed_0010_auto_20201216_1254"),
    ]

    operations = [
        migrations.AddField(
            model_name="audiolog",
            name="completed",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]