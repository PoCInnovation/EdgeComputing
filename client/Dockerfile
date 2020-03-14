FROM node:12-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . /app

RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
