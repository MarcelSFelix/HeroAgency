# syntax=docker/dockerfile:1
# Install Node and npm
FROM node:18.15.0

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

# Starts at localhost:4200 because of the Angular CLI
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
