#!/bin/sh
# wait-for-postgres.sh
# https://docs.docker.com/compose/startup-order/
# -e  Exit immediately if a command exits with a non-zero status.
set -e
cmd="$@"
until PGPASSWORD=$SQL_PASSWORD psql -h $SQL_HOST -U $SQL_USER -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 5
done
>&2 echo "Postgres is up - executing command"
exec $cmd
