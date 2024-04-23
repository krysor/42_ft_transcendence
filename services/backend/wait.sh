#!/bin/sh

while ! PGPASSWORD=postgres psql -h db -p 5432 -U root -d postgres; do
	echo "waiting for postgreSQL..."
	sleep 5
done
echo "postgreSQL connection succeed !"

python manage.py makemigrations
python manage.py migrate
# Check if superuser exists, if not, create it
if ! python -c "from django.contrib.auth.models import User; \
                User.objects.filter(username='admin').exists()"; then
    python manage.py createsuperuser --username=admin --email "" --noinput
fi

python manage.py runserver 0.0.0.0:8000

exec "$@"
