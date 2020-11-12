FROM node:alpine as builder

WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/scripts/database/*.json ./scripts/database/
COPY --from=builder /app/scripts/scripts /usr/bin/
RUN chmod +x /usr/bin/scripts

RUN yarn install --prod

EXPOSE 8080

CMD yarn start:prod