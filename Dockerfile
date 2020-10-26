FROM node:14 as node
WORKDIR /app
COPY package*.json /app/

RUN mkdir -p node_modules/node-sass/vendor/linux-x64-79
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.13.0/linux-x64-79_binding.node -o node_modules/node-sass/vendor/linux-x64-79/binding.node

RUN npm install
COPY ./ /app/
RUN npm rebuild node-sass
RUN npm run build -- --output-path=./dist/walmart/

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/walmart/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
