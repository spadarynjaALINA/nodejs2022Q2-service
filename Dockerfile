FROM node:lts-alpine as build
WORKDIR /usr/app/src
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "npm","run", "start:dev"]
