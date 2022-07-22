# FROM node:lts-alpine as build
# WORKDIR /usr/app/src
# COPY ["package*.json", "./" ]
# RUN npm install
# COPY . .

FROM node:8 as build
WORKDIR /app
COPY ["package*.json", "./" ]
RUN npm install
FROM node:8-alpine
EXPOSE ${PORT}
CMD ["npm","run", "start:dev"]
