FROM node:lts-alpine as build
WORKDIR /usr/app/src
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["docker system prune", "npm","run", "start:dev"]
