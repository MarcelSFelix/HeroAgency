# syntax=docker/dockerfile:1
# Above specifies Dockerfile syntax version

# Sets base image for Docker image install Node and npm
FROM node:18.15.0

# Set working directory
WORKDIR /angular-tour-of-heroes

# Install Angular CLI globally inside image 
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json from host into container
COPY package*.json ./

# Install dependencies from package.lock.json
RUN npm ci

# Copy the rest of the code from the host into the containers working directory
COPY . .

# Build the application into workdir/dist/angular-tour-of-heroes
RUN npm run build

