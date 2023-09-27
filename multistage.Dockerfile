FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]