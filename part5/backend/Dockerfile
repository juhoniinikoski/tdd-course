FROM node:18-bullseye-slim

WORKDIR /app/

COPY package.json /app
RUN npm install

COPY /src /app

ENTRYPOINT ["node", "index.mjs"]