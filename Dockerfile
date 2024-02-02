FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g typescript

RUN npm ci

COPY . .

RUN tsc

EXPOSE 3000

CMD [ "node", "dist/index.js" ]