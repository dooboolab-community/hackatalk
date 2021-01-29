import * as React from 'react';

import {AppProvider, useAppContext} from '../AppProvider';
import {Button, Text, View} from 'react-native';
import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

let testingLib: RenderResult;

const FakeChild = (): React.ReactElement => {
  const {state, resetUser, callDefault} = useAppContext();

  return (
    <View>
      <Text testID="TEXT">{JSON.stringify(state, null, 2)}</Text>
      <Button
        testID="BUTTON"
        onPress={(): void => {
          resetUser();
        }}
        title="Button"
      />
      <Button
        testID="BUTTON_NOT_VALID"
        onPress={(): void => {
          callDefault();
        }}
        title="Button"
      />
    </View>
  );
};

describe('[AppProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;

  const component = (
    <AppProvider>
      <FakeChild />
    </AppProvider>
  );

  it('should match component and snapshot', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });

  it('should call [resetUser] when button pressed', () => {
    testingLib = render(component);

    const btn = testingLib.queryByTestId('BUTTON');

    act(() => {
      fireEvent.press(btn);
    });
  });

  it('should call [default] when button pressed', () => {
    testingLib = render(component);

    const btn = testingLib.queryByTestId('BUTTON_NOT_VALID');

    act(() => {
      fireEvent.press(btn);
    });
  });
});

describe('[AppProvider] error rendering test', () => {
  let error: Error;
  const component = <FakeChild />;

  it('should throw error when [AppProvider] is not wrapped', () => {
    try {
      render(component);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });
});
