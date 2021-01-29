import * as React from 'react';

import {Button, Text, View} from 'react-native';
import {
  ThemeProvider,
  ThemeType,
  defaultThemeType,
  useThemeContext,
} from '@dooboo-ui/theme';
import {act, fireEvent, render} from '@testing-library/react-native';

const FakeChild = (): React.ReactElement => {
  const {themeType, changeThemeType} = useThemeContext();

  return (
    <View>
      <Text testID="test-text">{JSON.stringify(themeType, null, 2)}</Text>
      <Button
        testID="test-button"
        onPress={(): void => {
          changeThemeType();
        }}
        title="Button"
      />
    </View>
  );
};

describe('[ThemeProvider] rendering test', () => {
  const component = (
    <ThemeProvider>
      <FakeChild />
    </ThemeProvider>
  );

  it('component and snapshot matches', () => {
    const json = render(component).toJSON();

    expect(json).toMatchSnapshot();
    expect(json).toBeTruthy();
  });
});

describe('[ThemeProvider] interactions', () => {
  it('initial theme setup', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <FakeChild />
      </ThemeProvider>,
    );

    const text = getByTestId('test-text');

    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      defaultThemeType,
    );
  });

  it('test changeTheme()', async () => {
    const {getByTestId} = render(
      <ThemeProvider>
        <FakeChild />
      </ThemeProvider>,
    );

    const text = getByTestId('test-text');

    act(() => {
      fireEvent.press(getByTestId('test-button'));
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

    const {getByTestId} = render(ComponentWithProps);
    const text = getByTestId('test-text');

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

    const {getByTestId} = render(ComponentWithProps);
    const text = getByTestId('test-text');

    act(() => {
      fireEvent.press(getByTestId('test-button'));
    });

    expect(JSON.parse(text.children[0] as string)).toStrictEqual(
      ThemeType.LIGHT,
    );
  });
});
