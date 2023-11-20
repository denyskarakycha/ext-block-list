FROM node:18.18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.18 AS production

ARG NODE_ENV=production STAGE=prod
ENV NODE_ENV=${NODE_ENV} STAGE=${STAGE}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]