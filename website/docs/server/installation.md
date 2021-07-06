---
id: installation
title: Installation
sidebar_label: Installation
---

Server project belongs to seperate directory [server](https://github.com/dooboolab/hackatalk/tree/master/server), in [github](https://github.com/dooboolab/hackatalk).

We are using [Prisma](https://www.prisma.io) and [Nexus](https://nexus.js.org/docs/nexus-prisma) to serve our resolvers to clients.

### Local installation

1. Install your packages in `server` directory.
   ```
   yarn
   ```
   - Note that we recommend using yarn because all of our team members do.
   - Also note that `yarn.lock` and `package-lock.json` sometimes make collision. Try to delete one of them.

2. Configure [postgresql](https://www.google.com/search?q=postgresql&rlz=1C5CHFA_enKR865KR867&oq=postgresql&aqs=chrome.0.69i59j35i39j0l3j69i60j69i61l2.3220j0j7&sourceid=chrome&ie=UTF-8) database. Although [Prisma](https://prisma.io) works on many other databases, we recommend using `postgres` since we are using this in our live server. Also `postgres` is the primarily supported database in `Prisma`.
   - Sample installation for Ubuntu user
     ```sh
     sudo apt install postgresql
     ```
   - Sample installation for Mac user
     ```sh
     ~ brew services start postgresql
     ```
   - Example for changing password for user `postgres`
     ```sh
     sudo su - postgres
     psql
     alter user postgres with password 'your_password';
     ```
   - Example for creating new database user
     ```sh
     ~ createuser --interactive --pwprompt
     Enter name of role to add: postgres
     Enter password for new role: 
     Enter it again: 
     Shall the new role be a superuser? (y/n) y
     ```
   - Example for createing new database
     ```sh
     postgres -U postgres -h localhost -W
     Password: 

     postgres=# createdb hackatalk
     ```
   - Connect to database using [pgcli](https://www.pgcli.com)
     ```sh
     PGPASSWORD=dooboolab0! pgcli -h localhost -U postgres
     ```

3. Setup environment
   1. Setup your own local `environment` in your machine.
      - Copy `dotenv/test.env` to `dotenv/.env`.
        ```sh
        cp dotenv/test.env dotenv/.env
        ```
      - Include `DATABASE_URL` (* necessary field)
         ```
         DATABASE_URL="postgresql://<user>:<password>!@<url>:5432/<database>"
         ```
         > Note that you should change appropriate values in `user`, `password`, `url`, `database`, `scheme` fields. Or you can even use other databases. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)
      - Then run `yarn start` to start server with your local environment.
   2. Include `test` environment locally to test queries in your database. This should be included when writing a test code.
      ```sh
      $ psql -U postgres -h localhost -W
      postgres=> CREATE DATABASE test;
      postgres=> \connect test
      test=>
      ```
      - Above should match `test.env`
        ```
        DATABASE_URL="postgresql://postgres:dooboolab0!@localhost:5432/test"
        ```

4. Sync your local database with `Prisma`.
   ```sh
   yarn migrate:deploy
   ```
   - Above command will follow `dotenv/.env` environment.
   - If `Prisma` script does not create your `database` or `schema` automatically, create them manually then try again.

5. Generate Prisma Client and Nexus
   ```
   yarn generate
   ```

6. Migration (Usually during development)
   1. Change models in `./prisma/schema.prisma`.
   2. Run `migration:dev` to see if migration does not fail in your database.
      ```
      yarn migrate:dev
      ```
      - This [migration process](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate#prisma-migrate) generates below file.
         ```
         migrations/
         └─ 20200724010758-migration_name/
            └─ migration.sql
         ```
   3. Running `migration:deploy` will finish migrating your database.
      ```
      yarn migrate:deploy
      ```
