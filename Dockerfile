
FROM node:22.14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY .eslintrc* ./
COPY .prettierrc* ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:22.14 AS production

WORKDIR /usr/src/app


COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist


COPY --from=builder /usr/src/app/src/config ./dist/src/config

USER node

EXPOSE 3000
CMD ["npm", "run", "start:prod"]


FROM node:22.14 AS development

WORKDIR /usr/src/app

RUN apk add --no-cache mongodb-tools

COPY package*.json ./
COPY .eslintrc* ./
COPY .prettierrc* ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]