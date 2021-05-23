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

Setup environment
1. cp `./dotenv/test.env` `./dotenv/.env`
2. Include `DATABASE_URL`
   ```
   DATABASE_URL="postgresql://<user>:<password>@<url>:5432/postgres?schema=<scheme>"
   ```
   > Note that you should change appropriate values in `user`, `password`, `url`, `scheme` fields. Or you can even use other database. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)
3. Running `yarn start` will load `env` from `dotenv/.env`.

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
   yarn migrate:dev
   ```
   > Prisma ensure that the db migrates correctly after changing Prisma schema (`schema.prisma`).
3. Deploy migration to production.
   ```
   yarn migrate:deploy
   ```
   > This migrates your local database.

When you've changed your `schema.prisma`, in your `pull request`, note that in the readme that the db should be migrated before deploying sourcecode to production.

[2021.05.13]
Currently, we don't have any better solution to seamlessly deploy database when sourcecode is merged. This is because we won't let github workflow or anyother workflow to access our database for security reason. We are looking for a better option to run the migration script in [Azure](https://azure.microsoft.com) side.

#### Create test user

```sh
➜  ~ createuser --interactive --pwprompt
Enter name of role to add: test
Enter password for new role: 
Enter it again: 
Shall the new role be a superuser? (y/n) y
```