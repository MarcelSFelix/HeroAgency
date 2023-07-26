# Sets base image for Docker image under an alias - ngi
FROM nginx:latest AS ngi
# Copies contents of /angular-tour-of-heroes from Docker image testfrontend:latest into /usr/share/nginx/html of the current image
COPY --from=testfrontend:latest /angular-tour-of-heroes/dist/angular-tour-of-heroes /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf

# Starts at localhost:80
EXPOSE 80
