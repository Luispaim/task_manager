# pull official base image
FROM python:3.8.7

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1

# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

RUN apt-get update && \
    apt-get install -y nano \
    postgresql-client && \
    mkdir /app
RUN echo "alias ll='ls -alF'" >> ~/.bashrc

# set work directory
WORKDIR /app

# install dependencies
RUN pip install --upgrade pip
COPY ./Pipfile .
COPY ./Pipfile.lock .
RUN pip install pipenv && pipenv install --system

# copy project
COPY . .

# run wait-for-postgres.sh
ENTRYPOINT ["/app/wait-for-postgres.sh"]
