FROM node:18-bullseye-slim

WORKDIR /app/

COPY package.json /app
RUN npm install

COPY /src /app/src
COPY /tsconfig.json /app

RUN npm run build

ENTRYPOINT ["node", "dist/src/index.js"]