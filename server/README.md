# ts-apollo-prisma

[![CircleCI](https://circleci.com/gh/dooboolab/ts-apollo-prisma.svg?style=svg)](https://circleci.com/gh/dooboolab/ts-apollo-prisma)
[![codecov](https://codecov.io/gh/dooboolab/ts-apollo-prisma/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/ts-apollo-prisma)

> Boilerplate for typescript apollo server using prisma (known as Prisma 2).

## Specification
* [node](https://nodejs.org)
* [typescript](https://typescriptlang.org)
* [prisma](https://www.prisma.io)
* [prisma-nexus](https://www.nexusjs.org/#/components/schema/plugins/prisma)
* [apollo-server](https://www.apollographql.com/docs/apollo-server)
* [jest](https://jestjs.io)

## Setup environment
1. cp `./prisma/.env.sample` `./prisma/.env`
2. Include `DATABASE_URL`
   ```
   DATABASE_URL="postgresql://<user>:<password>!@<url>:5432/postgres?schema=<scheme>"
   ```
   > Note that you should change appropriate values in `user`, `password`, `url`, `scheme` fields. Or you can even use other database. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)

## Generate Prisma Client and Nexus
```
yarn generate
```

## Migration

#### Init migration

1. Change models in `schema.prisma`.
   > Note that `prisma/migrations` dir is included in `.gitignore` in this repo but it should not be ignored in production.
2. Run migration script.
   ```
   yarn migrate:save
   ```
   > Prisma lift will generate migration file for you.
3. Run migration.
   ```
   yarn migrate:up
   ```
