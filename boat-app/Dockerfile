FROM node:12.7-alpine AS builder
WORKDIR /code
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /code/dist/boat-app /usr/share/nginx/html