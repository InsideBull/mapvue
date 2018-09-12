FROM alpine:3.6

ENV NODE_VERSION 8.11.4

RUN mkdir -p /my-app

WORKDIR my-app/

COPY package.json /my-app

RUN npm install

COPY . /my-app


EXPOSE 8080