# HackaTalk (Server)

- [Contributing](https://github.com/dooboolab/hackatalk/blob/master/CONTRIBUTING.md#server)

## Specification
* [node](https://nodejs.org)
* [typescript](https://typescriptlang.org)
* [prisma](https://www.prisma.io)
* [prisma-nexus](https://www.nexusjs.org/#/components/schema/plugins/prisma)
* [apollo-server](https://www.apollographql.com/docs/apollo-server)
* [jest](https://jestjs.io)


## Diagram
<img src="https://user-images.githubusercontent.com/60481383/96114278-5c7d0780-0f20-11eb-8189-edbaa2b9860e.png" width="70%">

etup environment
1. cp `./dotenv/dev.env` `./dotenv/.env`
2. Include `DATABASE_URL`
   ```
   DATABASE_URL="postgresql://<user>:<password>!@<url>:5432/postgres?schema=<scheme>"
   ```
   > Note that you should change appropriate values in `user`, `password`, `url`, `scheme` fields. Or you can even use other database. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)
3. Running `yarn local` will load `env` from `dotenv/.env`.

## Generate Prisma Client and Nexus
```
yarn generate
```

## Migration

#### Init migration

1. Change models in `schema.prisma`.
   > Note that `prisma/migrations` dir is included in `.gitignore` in this repo but it should not be ignored in production.
2. Run migration script.
   > Note that this should be targeting the production database. Locally, you can just run `yarn db-push`.
   ```
   yarn migrate
   ```
3. Deploy migration to production.
   > Note you may want to run `yarn migrate:dev` beforhand to test your migration.
   ```
   yarn migrate:deploy
   ```

#### Create test user

```sh
➜  ~ createuser --interactive --pwprompt
Enter name of role to add: test
Enter password for new role: 
Enter it again: 
Shall the new role be a superuser? (y/n) y
```