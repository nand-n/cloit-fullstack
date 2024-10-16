FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./

COPY prisma/ /app/prisma/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./

COPY prisma/ /app/prisma/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]