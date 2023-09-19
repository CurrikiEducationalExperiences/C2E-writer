FROM node:16 as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ARG DOMAIN
ENV DOMAIN_URL=$DOMAIN

ARG REACT_APP_GOOGLE_CLIENT_ID
ENV react_app_google_client_id=$REACT_APP_GOOGLE_CLIENT_ID
RUN echo "REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID" > .env

COPY ./package*.json ./
RUN npm install
COPY . .

RUN npm run build

# COPY . .

# -- RELEASE --
FROM nginx:stable-alpine as release

COPY --from=build /app/build /usr/share/nginx/html
# copy .env.example as .env to the release build
# COPY --from=build /app/.env.example /usr/share/nginx/html/.env
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf


WORKDIR /usr/share/nginx/html

EXPOSE 80
CMD ["/bin/sh", "-c", "nginx -g \"daemon off;\""]