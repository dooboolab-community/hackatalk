FROM node:14.15.5 as build

WORKDIR /usr/src

COPY package.json .

RUN yarn

COPY . .

RUN yarn build


FROM node:14.15.5

ENV NODE_ENV=dev

WORKDIR /app

COPY --from=build /usr/src /app
# COPY --from=build /usr/src/package.json /app/package.json
# COPY --from=build /usr/src/dist /app/dist
# COPY --from=build /usr/src/node_modules /app/node_modules

EXPOSE 4000

CMD ["yarn", "start"]
