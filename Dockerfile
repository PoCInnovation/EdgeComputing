FROM node:11

WORKDIR /app/server

RUN apt-get install python

ADD server /app/server
ADD edge-computing /app/edge-computing

RUN yarn install

CMD ["yarn", "start"]
