FROM node:16.15-alpine as builder
WORKDIR /usr/app/src
COPY package*.json .
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE ${PORT}
CMD [ "npm","run", "start:dev"]
