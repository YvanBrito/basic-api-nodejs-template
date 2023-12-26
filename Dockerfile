FROM node:20.10-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.10-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]