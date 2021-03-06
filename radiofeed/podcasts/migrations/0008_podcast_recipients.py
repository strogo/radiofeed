# Generated by Django 3.1.3 on 2020-12-22 11:29

# Django
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("podcasts", "0007_podcast_extracted_text"),
    ]

    operations = [
        migrations.AddField(
            model_name="podcast",
            name="recipients",
            field=models.ManyToManyField(
                blank=True,
                related_name="recommended_podcasts",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
