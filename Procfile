release: python manage.py migrate
web: gunicorn --workers=1 --max-requests=1000 --max-requests-jitter=50 radiofeed.config.wsgi
worker: celery -A radiofeed.config.celery_app worker -l INFO
beat: celery -A radiofeed.celery_app beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler
