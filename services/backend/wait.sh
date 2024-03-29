#!/bin/sh

while ! PGPASSWORD=postgres psql -h db -p 5432 -U root -d postgres; do
	echo "waiting for postgreSQL..."
	sleep 5
done

echo "postgreSQL connection succeed !"


# CMD python manage.py makemigrations && python manage.py migrate && python manage.py createsuperuser --username=admin2 --email "" --noinput && python manage.py runserver 0.0.0.0:8000

exec	python manage.py makemigrations && \
		python manage.py migrate && \
		python manage.py runserver 0.0.0.0:8000
