# Stage 1
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:production

# Stage 2 - Para exponer nuestra aplicación ya compilada
FROM nginx:alpine
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist  /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]