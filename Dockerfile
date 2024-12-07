FROM node:18.20-bullseye

WORKDIR /app

RUN chown -R node:node /app

COPY . .

RUN npm install

USER node

EXPOSE 3000

CMD [ "npm", "run", "start" ]