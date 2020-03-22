FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist /www

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
