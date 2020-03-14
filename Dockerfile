FROM node:12

WORKDIR /app/server

RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev libgif-dev \
  librsvg2-dev

ADD server/package*.json ./
ADD server/yarn.lock ./

RUN yarn install

ADD server/ ./
ADD edge-computing /app/edge-computing

CMD ["yarn", "start"]
