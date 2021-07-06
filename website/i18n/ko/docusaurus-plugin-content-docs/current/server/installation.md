---
id: installation
title: 설치
sidebar_label: 설치
---

import useBaseUrl from '@docusaurus/useBaseUrl';

서버 어플리케이션은 별도 디렉토리인 [server](https://github.com/dooboolab/hackatalk/tree/master/server)에 작성되었습니다.

서버에서 구현된 api들은 [Prisma](https://www.prisma.io)와 [Nexus](https://nexus.js.org/docs/nexus-prisma)를 주로 이용하며 개발하고 있습니다.

### 로컬 설치

1. `server` 디렉토리에서 패키지들을 설치합니다.
   ```
   yarn
   ```
   - npm이 아닌 yarn을 사용해주세요. 우리는 yarn을 선호합니다.
   - npm과 yarn을 동시에 쓰면 lock파일이 서로 충돌을 일으킬 수 있습니다.

2. [Postgresql](https://www.google.com/search?q=postgresql&rlz=1C5CHFA_enKR865KR867&oq=postgresql&aqs=chrome.0.69i59j35i39j0l3j69i60j69i61l2.3220j0j7&sourceid=chrome&ie=UTF-8) 데이터베이스를 설치합니다. [Prisma](https://prisma.io)가 다른 데이터베이스들과도 호환되지만 해커톡에서 사용되는 데이터베이스가 `postgres`이기 때문에 이를 권장합니다. 첨언으로 `postgres`는 `Prisma`에서 우선적으로 자원하는 데이터베이스입니다.
   - Ubuntu 사용자를 위한 설치 예시
     ```sh
     sudo apt install postgresql
     ```
   - Mac 사용자를 위한 설치 예시
     ```sh
     ~ brew install postgresql
     ~ brew services start postgresql
     ```
   - 데이터베이스 `postgres` 사용자 암호 변경 예시
     ```sh
     sudo su - postgres
     psql
     alter user postgres with password 'your_password';
     ```
   - 데이터베이스 새 사용자 생성 예시
     ```sh
     ~ createuser --interactive --pwprompt
     Enter name of role to add: postgres
     Enter password for new role: 
     Enter it again: 
     Shall the new role be a superuser? (y/n) y
     ```
   - 새로운 데이터베이스 생성 예시
     ```sh
     psql -U postgres -h localhost -W
     Password: 

     postgres=# createdb hackatalk
     ```
   - [pgcli](https://www.pgcli.com)를 이용하여 데이터베이스에 접속
     ```sh
     PGPASSWORD=dooboolab0! pgcli -h localhost -U postgres
     ```

3. 환경설정
   1. 로컬에서 `환경변수`를 설정해줍니다.
      - `dotenv/test.env`를 `dotenv/.env`에 복사합니다.
        ```sh
        cp dotenv/test.env dotenv/.env
        ```
      - 올바른 `DATABASE_URL`을 기재합니다. **필수**
         ```
         DATABASE_URL="postgresql://<user>:<password>!@<url>:5432/<database>"
         ```
         > `user`, `password`, `url`, `database` 필드들을 올바로 적어주새요. 참고로 [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)를 확인하시면 되겠습니다.
      - 다음으로 `yarn start` 스크립트를 실행하여 로컬환경에서 서버를 실행시킵니다.
   2. 로컬에 `test` 환경을 설정하고 쿼리들을 테스트합니다. 테스트코드 작성을 위해 필수적으로 진행해주세요.
      ```sh
      $ psql -U postgres -h localhost -W
      postgres=> CREATE DATABASE test;
      postgres=> \connect test
      test=>
      ```
      - 위와 같이 해주시면 `test.env`와 동일한 상태가 됩니다.
        ```
        DATABASE_URL="postgresql://postgres:dooboolab0!@localhost:5432/test"
        ```

4. `Prisma`와 데이터베이스를 동기화합니다.
   ```sh
   yarn migrate:deploy
   ```
   - 위 스크립트는 `dotenv/.env` 환경과 동기화시킵니다.
   - 만약 `Prisma` 명령어가 `database` 또는 `schema`를 생성해주지 않으면, 메뉴얼하게 파일을 생성하고 다시 시도해주세요.

5. Prisma Client와 Nexus를 이용하여 typegen을 실시합니다.
   ```
   yarn generate
   ```

6. 개발 도중 마이그레이션
   1. 변경할 모델을 `./prisma/schema.prisma`에서 수정합니다.
   2. `migration:dev`를 실행하여 로컬 데이터베이스에서 마이그레이션이 통과하는지 확인합니다.
      ```
      yarn migrate:dev
      ```
      - This [migration process](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate#prisma-migrate) generates below file.
         ```
         migrations/
         └─ 20200724010758-migration_name/
            └─ migration.sql
         ```
   3. 2번이 성공적으로 수행하면 `migration:deploy`로 실제 마이그레이션을 적용합니다.
      ```
      yarn migrate:deploy
      ```
