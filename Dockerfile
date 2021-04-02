FROM node:10-alpine

RUN mkdir -p /docker-monitoring/node_modules && chown node:node /docker-monitoring && chown -R node:node /docker-monitoring/*

WORKDIR /docker-monitoring

COPY package*.json ./

USER root

RUN npm install

COPY --chown=node:node . .

CMD [ "node", "index.js" ]
