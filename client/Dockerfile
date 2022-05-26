FROM node:14.17.3

WORKDIR /var/www/html

COPY . .

RUN npm install

RUN npm rebuild node-sass

EXPOSE 3000