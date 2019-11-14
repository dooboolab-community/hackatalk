import * as React from 'react';

import { Button, Text, View } from 'react-native';
import {
  ThemeProvider,
  defaultThemeType,
  useThemeContext,
} from '../ThemeProvider';
import { act, fireEvent, render } from '@testing-library/react-native';

import { ThemeType } from '../../types';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const FakeChild = (): React.ReactElement => {
  const { themeType, changeThemeType } = useThemeContext();

  return (
    <View>
      <Text testID="TEXT">{JSON.stringify(themeType, null, 2)}</Text>
      <Button
        testID="BUTTON"
        onPress={(): void => {
          changeThemeType();
        }}
        title="Button"
      />
    </View>
  );
};

describe('[ThemeProvider] rendering test', () => {
  let json: renderer.ReactTestRendererJSON;
  const component = (
    <ThemeProvider>
      <FakeChild />
    </ThemeProvider>
  );

  it('component and snapshot matches', () => {
    json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});

describe('[ThemeProvider] interactions', () => {
  it('initial theme setup', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FakeChild />
      </ThemeProvider>,
    );
    const text = getByTestId('TEXT');
    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      defaultThemeType,
    );
  });

  it('test changeTheme()', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <FakeChild />
      </ThemeProvider>,
    );
    const text = getByTestId('TEXT');
    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      ThemeType.DARK,
    );
  });

  it('set initial theme by props()', async () => {
    const type = ThemeType.DARK;
    const ComponentWithProps = (
      <ThemeProvider initialThemeType={type}>
        <FakeChild />
      </ThemeProvider>
    );

    const { getByTestId } = render(ComponentWithProps);
    const text = getByTestId('TEXT');
    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      ThemeType.DARK,
    );
  });

  it('changeTheme() after setting initial theme by props()', async () => {
    const type = ThemeType.DARK;
    const ComponentWithProps = (
      <ThemeProvider initialThemeType={type}>
        <FakeChild />
      </ThemeProvider>
    );

    const { getByTestId } = render(ComponentWithProps);
    const text = getByTestId('TEXT');
    act(() => {
      fireEvent.press(getByTestId('BUTTON'));
    });
    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      ThemeType.LIGHT,
    );
  });
});
