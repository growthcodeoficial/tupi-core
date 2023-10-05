ARG NODE_VERSION

FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY .docker/.env ./
COPY src/ src/

RUN yarn install --frozen-lockfile --verbose

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then yarn build; fi

ARG APP_PORT
EXPOSE $APP_PORT

CMD if [ "$NODE_ENV" = "production" ]; then node dist/index.js; else yarn dev; fi
