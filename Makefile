build:
	docker-compose build

collectstatic:
	python manage.py collectstatic --noinput

makemigrations:
	docker-compose run api python manage.py makemigrations --noinput

migrate:
	docker-compose run api python manage.py migrate --noinput

run:
	docker-compose up -d

stop:
	docker-compose stop

up:
	docker-compose up
