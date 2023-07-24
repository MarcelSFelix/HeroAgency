# syntax=docker/dockerfile:1
# Install Node and npm
FROM node:18.15.0 as build

# Set working directory
WORKDIR /angular-tour-of-heroes

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# NGINX Magic - Serve app with nginx server

FROM nginx:latest AS ngi

COPY --from=build /angular-tour-of-heroes/dist/angular-tour-of-heroes /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
# Below does not work - "server" directive is not allowed here in /etc/nginx/nginx.conf:1
# COPY /nginx.conf /etc/nginx/nginx.conf

# Starts at localhost:80
EXPOSE 80
