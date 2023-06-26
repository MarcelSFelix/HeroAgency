# syntax=docker/dockerfile:1
# Install Python
FROM python:3.10.6

# Set working directory
WORKDIR /myheroes

# Copy everything
COPY . .

RUN ["pip", "install", "-r", "requirements.txt"]

# Starts at localhost:8080
EXPOSE 8080

CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8080


## syntax=docker/dockerfile:1
## Install Python
#FROM python:3.10.6
#
## Set working directory
#WORKDIR /myheroes
#
## Copy everything
#COPY . .
#
#RUN ["pip", "install", "-r", "requirements.txt"]
#
## Starts at localhost:8080
#EXPOSE 8080
#
#CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8080

