FROM node:14-alpine as builder

WORKDIR /app

COPY app/package.json .

RUN npm install

COPY app/ .

RUN npm run build

FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

RUN mv nginx.conf default.conf

COPY --from=builder /app/build /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]