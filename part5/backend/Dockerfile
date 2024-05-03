FROM node:18-bullseye-slim

WORKDIR /app/

COPY package.json /app
RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY /src /app/src
COPY /tsconfig.json /app
COPY /drizzle.config.ts /app

RUN npm run build

ENTRYPOINT ["sh", "-c", "npm run db:push && node dist/src/index.js"]