FROM node:12

WORKDIR /app

COPY ./dist /app

RUN npm i -g http-server --registry=https://registry.npm.taobao.org

EXPOSE 4002

CMD [ "http-server" "/app -p 4002"]

