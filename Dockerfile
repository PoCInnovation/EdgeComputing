FROM node:11

WORKDIR /app/server

RUN apt-get update && apt-get install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev libgif-dev \
  librsvg2-dev

ADD server /app/server
ADD edge-computing /app/edge-computing

RUN yarn install --force

CMD ["yarn", "start"]
