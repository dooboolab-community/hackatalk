import 'react-native';
import * as React from 'react';
import Button from '../Button';
import {ThemeProvider} from 'styled-components/native';
import createTheme, {ThemeType} from '../../../utils/theme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {fireEvent, render} from 'react-native-testing-library';

let cnt = 0;
const onPress = () => {
  cnt++;
};

const component: React.ReactElement = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Button onPress={onPress} />
  </ThemeProvider>
);

describe('[Button] rendering test', () => {
  it('renders [enabled] as expected', () => {
    const json = renderer.create(component).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders [disabled] as expected', () => {
    const disabledComponent: React.ReactElement = (
      <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
        <Button isDisabled={true}/>
      </ThemeProvider>
    );
    const json = renderer.create(disabledComponent).toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[Button] interaction', () => {
  let rendered: renderer.ReactTestRenderer;
  let testingLib: any;

  beforeAll(() => {
    rendered = renderer.create(component);
    testingLib = render(component);
  });

  it('should fireEvent when peer image is pressed', () => {
    const touchBtn = testingLib.getByTestId('press_id');
    fireEvent(touchBtn, 'press');
    expect(cnt).toEqual(1);
  });
});
