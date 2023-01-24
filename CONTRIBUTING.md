## Contribution Guide (@copyright by dooboolab)

**We prefer you to use [vscode](https://code.visualstudio.com)**

## Server
To contribute to server-side project, you need to install the `server` project locally. You can follow the [server installation](https://website.hackatalk.dev/docs/server/installation) to setup your local server.

## Client
To contribute to the `client-side` project, you can go over [client installation](https://website.hackatalk.dev/docs/client/installation) to run your `app` or `web` which communicates with your local server.

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

PR is available to `main` branch.

Each PR should correspond to one idea and implement it coherently. This idea may be a feature that spans several parts of the codebase. For example, changing an API may include changes to the Android, iOS, and web implementations, the JavaScript SDK, and the docs for the API.

Generally, each PR should contain one commit that is amended as you address code review feedback. Each commit should be meaningful and make sense on its own. Similarly, it should be easy to revert each commit. This keeps the commit history easier to read when people are working on this code or searching for a commit that could have broken something.

## Coding Guidelines

Mostly, coding convention is configured in project with `eslint` and `prettier`.

> `yarn lint` command will cover your code style either.

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

- [How to use prettier extension for the eslint code rules](https://medium.com/dooboolab/using-eslint-prettier-and-sort-imports-vscode-extensions-for-formatting-open-source-project-16edf317129d)
- while you are using prettier extension, you may encounter **ternary operator** indentation problems

  ![error](https://i.imgur.com/RhGrbLo.png)

  you can use

  ```
  // prettier-ignore
  ```

  like below

  ![fixes](https://i.imgur.com/x3bL5kf.png)

## Test Code
Hackatalk uses [Jest](https://jestjs.io) to write test codes for both client & server.
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
