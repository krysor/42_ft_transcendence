#!/bin/sh

while ! PGPASSWORD=postgres psql -h db -p 5432 -U root -d postgres &>/dev/null; do
	echo "waiting for postgreSQL..."
	sleep 5
done

echo "postgreSQL connection succeed !"

exec "$@"