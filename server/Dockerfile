FROM node:alpine

WORKDIR  /app

COPY package*.json .
COPY yarn.lock .
COPY ./tsconfig.json .

RUN yarn install

ADD ./src /app/src

RUN yarn build

CMD ["yarn", "start"]
