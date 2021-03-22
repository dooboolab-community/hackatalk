## Contribution Guide (@copyright by dooboolab)

**We prefer you to use [vscode](https://code.visualstudio.com)**

## Server

> You should be aware of below stacks(do not need to be professional) to contribute to server project.

1. [Graphql](https://graphql.org)
2. [Apollo Server](https://www.apollographql.com/docs/apollo-server)
3. [Prisma](https://www.prisma.io)
   - AKA Prisma2
4. [Postgresql](https://www.postgresql.org)


## Client

> You should be aware of below stacks(do not need to be professional) to contribute to client project.

1. [React Native](https://facebook.github.io/react-native)
   - [iOS / Android setup guide](https://facebook.github.io/react-native/docs/getting-started)
2. [expo](https://expo.io)
3. [Graphql](https://graphql.org)
4. [Relay](https://relay.dev)


## Installation

1. Fork our project to yours.
   - Recommended to have `forked` master branch to be updated to upstream.
   - Configure [Syncing a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/).
     - `git remote add upstream https://github.com/dooboolab/hackatalk`
     - Check it with `git remote -v`
   - Fetch the branches from upstream repository by `git fetch upstream`
   - When you want to give `PR`, make new branch `git checkout -b [feature_name]`
     - Before pushing `PR`, do `git fetch upstream` from master branch then try the rebase by `git rebase master`
     - Check your status by `git log --decorate --oneline --all --graph` or `npm run git:log`
2. Git clone your forked repository.
   ```
   git clone https://github.com/<your-id>/hackatalk.git
   ```

#### Installation - Client specific

1. Install your packages in `client` directory.
   ```
   yarn
   ```
   - Note that we recommend using yarn because all of our team members do.
   - Also note that `yarn.lock` and `package-lock.json` sometimes make collision. Try to delete one of them.

2. Configure `environment` for project
   - Copy `.env.sample` to `.env`.
     ```
     cp .env.sample .env
     ```

3. Run your project
   - Server
     - Run `yarn dev` or `yarn local` if you want to run your local server.
   - Client
     - `yarn start` will open `expo` console.

4. Configure linting in [vscode](https://code.visualstudio.com) correctly.
   - Example vscode [setting.json](https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1)
   - Recommended [vscode extension list](https://gist.github.com/hyochan/815e9040593180c4725d7694d863e5a1#gistcomment-3019263)


#### Installation - Server specific

1. Install your packages in `server` directory.
   ```
   yarn
   ```
   - Note that we recommend using yarn because all of our team members do.
   - Also note that `yarn.lock` and `package-lock.json` sometimes make collision. Try to delete one of them.

2. Configure [postgresql](https://www.google.com/search?q=postgresql&rlz=1C5CHFA_enKR865KR867&oq=postgresql&aqs=chrome.0.69i59j35i39j0l3j69i60j69i61l2.3220j0j7&sourceid=chrome&ie=UTF-8) database.

3. Setup environment
   1. You can use our default `environment` which is configured in `dotenv/dev.env`. However, this may not be sufficient when developing so you can also set them up locally.
   2. Setting up own `environment` locally.
      - Copy `dotenv/dev.env` to `dotenv/.env`.
        ```
        cp dotenv/dev.env dotenv/.env
        ```
      - Include `DATABASE_URL` (* necessary field)
         ```
         DATABASE_URL="postgresql://<user>:<password>!@<url>:5432/<database>?schema=<scheme>"
         ```
         > Note that you should change appropriate values in `user`, `password`, `url`, `database`, `scheme` fields. Or you can even use other database. More about [connection urls](https://www.prisma.io/docs/reference/database-connectors/connection-urls)
      - Then run `yarn local` to start server with your local environment.
   3. Please include `test` environment locally to test queries in your database.
      ```
      $ psql postgres
      postgres=> CREATE DATABASE postgres;
      // Connect Inside `postgres` database to create `test` schema.
      postgres=> \connect postgres
      test=> CREATE SCHEMA test;
      ```
      - Above should match `test.env`
        ```
        DATABASE_URL="postgresql://postgres:dooboolab0!@localhost:5432/postgres?schema=test"
        ```

4. Sync your local database with `Prisma`.
   ```
   yarn migrate:up
   ```
   - Above command will follow `dotenv/.env` environment.

5. Generate Prisma Client and Nexus
   ```
   yarn generate
   ```

6. Migration
   1. Change models in `./prisma/schema.prisma`.
   2. Run `migration:save` script and type the migration name that you want.
      ```
      yarn migrate:save
      ✔ Name of migration … [type the "migration_name"]
      📼  migrate save --name migration_name
      ```
      - This [migration process](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate#prisma-migrate) makes some files like
         ```
         migrations/
         └─ 20200724010758-migration_name/
            └─ steps.json
            └─ schema.prisma
            └─ README.md
         ```
   3. Run `migration:up`. this process will generate models that you've changed in actual postgre DB.
      ```
      yarn migrate:up
      ```


## Commit message

Commit messages should include a title, summary, and test plan.

Write the title in the imperative mood and prefix it with a tag that describes the affected code, like [android] or [video], and makes it easier to read through the commit log.

In the summary, explain the motivation behind the commit ("why") and the approach it takes ("how"). Note things that aren't communicated by the code or require more context to infer.

Use the test plan to communicate how to verify the code actually works and to help others in the future create their test plans for the same area of the codebase.

This post called [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) has a lot of good guidance, too.

## Issue

- Please search and register if you already have the issue you want to create. If you have a similar issue, you can add additional comments.
- Please write a problem or suggestion in the issue. Never include more than one item in an issue.
- Please be as detailed and concise as possible. \* If necessary, please take a screenshot and upload an image.

## Pull request(PR)

PR is available to `master` branch.

Each PR should correspond to one idea and implement it coherently. This idea may be a feature that spans several parts of the codebase. For example, changing an API may include changes to the Android, iOS, and web implementations, the JavaScript SDK, and the docs for the API.

Generally, each PR should contain one commit that is amended as you address code review feedback. Each commit should be meaningful and make sense on its own. Similarly, it should be easy to revert each commit. This keeps the commit history easier to read when people are working on this code or searching for a commit that could have broken something.

## Coding Guidelines

Please follow the Coding conventions as much as possible when contributing your code. This is mostly covered by `eslint` plugin in `vscode`. Add `eslint` plugin and add below in `setting.json` in `vscode` to fix `coding style` in live editing.

```
"eslint.enable": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
],
```

> `npm run lint` command will cover your code style either.

General styles

- The indent tab is two spaces.
- The class declaration and the `{}` in curly brackets such as function, if, foreach, for, and while should be in the following format. Also if you installed eslint in vscode or in your code editor, it will help you with linting. \* `{` should be placed in same line and `}` should be placed in next line.

```
for (let i = 0; i < 10; i++) {
  ...
}
array.forEach((e) => {
  ...
});
```

- Space before `(` and after `)`.

*** Important ***
- testID should be written in `kebab-case`
  `testID = "my-test-id"`
- Class name should be a `PascalCase`
- Enum type should be a `PascalCase`
- Constants should be written in `UPPER_SNAKE_CASE`
   * Note that this is for `number`, `string` and constant `array`.
   * Unformed data type like object or class variable should be written in `camelCase`.
- Variables and functions should be written in `camelCase`
- Assets name should be written in `lower_snake_case`
  `const imgUrl = 'assets/icons/icon_add.png'`

- **If you find code that does not fit in the coding convention, do not ever try to fix code that is not related to your purpose.**

## Formatting (Prettier)

- [how to use prettier extension for the eslint code rules](https://medium.com/dooboolab/using-eslint-prettier-and-sort-imports-vscode-extensions-for-formatting-open-source-project-16edf317129d)
- while you are using prettier extension, you may encounter **ternary operator** indentation problems

  ![error](https://i.imgur.com/RhGrbLo.png)

  you can use

  ```
  // prettier-ignore
  ```

  like below

  ![fixes](https://i.imgur.com/x3bL5kf.png)

## Test Code
Hackatalk uses [Jest](https://jestjs.io/) to write test codes for both client & server.
### Client Testing
#### Testing Library
Client test codes are written with `@testing-library/react-native`.

If you are not familiar with the library, check out its [documentation](https://callstack.github.io/react-native-testing-library/).

Also, Kent Dodds has a [really good article](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) about what to avoid when writing tests for React.
Here are a few rules especially important in Hackatalk test codes.

1. Use explicit assertion for `waitFor`:
`waitFor` retries an assertion until it passes or until timeout.
Therefore, an empty `waitFor` call does nothing but run one tick of the event loop.
Put single explicit assertion inside `waitFor`.
    ```tsx
    // Wrong.
    await waitFor(() => {});

    // Correct.
    await waitFor(() => screen.getByText('Complete'));
    await waitFor(() => expect(mockFunction).toHaveBeenCalledTimes(1));
    ```

1. Use `act` only when necessary:
`render` and `fireEvent` is already wrapped inside `act`. Do not wrap them again.
Also, do not `await` the `act` call because `act` is not an async function.
    ```tsx
    // Wrong.
    act(() => {
    fireEvent.press(sendButton);
    });
 
    // Correct.
    fireEvent.press(sendButton);
    act(() => {
      mockEnvironment.mock.resolveMostRecentOperation(
         (operation) => MockPayloadGenerator.generate(operation)
      );
    });
    ```

#### Helper Functions

`client/test/testUtils.tsx` file provides useful helper functions for test purposes.

- `createTestElement` : Wraps the given element inside React context providers.
Many components depend on style context, auth context, etc., so it is useful to have
a function to provide all required context providers.
Override context values can be passed as the second argument.
- `createMockNavigation` : Create a stub for `navigation` which can be used to mock `useNavigation` hook.
Each method of the generated `navigation` can be overriden for each test cases.

#### Client Test Code Example
```tsx
import {createTestElement, createMockNavigation} from '../test/testUtils';
import ReactNavigation from '@react-navigation/core';

// Mock React Navigation.
// Replace "MainStack" and "Message" according to the component being tested.
const mockNavigation = createMockNavigation<MainStackNavigationProps<'Message'>>();
const mockRoute<RouteProp<MainStackParamList, 'Message'>> = {
  key: '',
  name: 'Message',
  params: {
    channel: {
      id: 'test-channel-6767',
      channelType: 'private',
    },
  },
};
mockNavigation.setParams.mockImplementation(() => {
  // Override navigation methods.
});
jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual<typeof ReactNavigation>('@react-navigation/core'),
  useNavigation: () => mockNavigation,
  useRoute: () => mockRoute,
}));

function generateChannel(_: unknown, generateId: () => number): Channel {
  return {
    id: `test-channel-${generateId()}`,
    channelType: 'private',
    name: 'John Doe',
  };
}

function generateMessage(_: unknown, generateId: () => number): MessageType {
  return {
    id: `test-message-${generateId()}`,
    text: 'Hello there!',
    messageType: 'text',
    createdAt: '2021-03-19T04:30:30.162Z',
    sender: {
      id: 'test-user-111',
      name: 'John Doe',
      nickname: 'john',
      photoURL: 'https://example.com/myphoto.jpg',
      thumbURL: 'https://example.com/john-profile.jpg',
      hasBlocked: false,
      statusMessage: "I'm alive.",
    },
  }
}

// TEST SUITE.
describe('[MyComponent]', () => {
  // FIRST TEST CASE.
  it('matches snapshot', async () => {
    const mockEnvironment = createMockEnvironment();

    // Wrap `MyComponent` inside React context providers.
    const component = createTestElement(<MyComponent />, {
      environment: mockEnvironment, // Use mock Relay environment.
    });

    // Render component. (NOTE: do not use `act` with `render`)
    const screen = render(component);

    // Wrap Relay query resolution inside `act`.
    act(() => {
      mockEnvironment.mock.resolveMostRecentOperation(
        (operation) => MockPayloadGenerator.generate(operation, {
          User: generateUser,
          Message: generateMessage,
        }),
      );
    });

    // Take snapshot.
    const json = screen.toJSON();
    expect(json).toBeTruthy();
    expect(json).toMatchSnapshot();
  });

  // SECOND TEST CASE.
  it('shows label when button is pressed', async () => {
    // You can use different Relay environment for each test case.
    const mockEnvironment = createMockEnvironment();

    mockEnvironment.mock.queueOperationResolver(
      (operation) => MockPayloadGenerator.generate(operation, {
        User: generateUser,
        Message: generateMessage,
      }),
    );

    const component = createTestElement(<MyComponent />, {
      environment: mockEnvironment,
    });

    const screen = render(component);

    // Wait until the button is rendered.
    const sendButton = await screen.findByText(/SEND/i);

    // Press the button. (NOTE: do not use `act` with `fireEvent`)
    fireEvent.press(sendButton);

    // Assertion
    await waitFor(() => screen.getByText(/COMPLETE/i));
  });
});
```

### Server Testing
