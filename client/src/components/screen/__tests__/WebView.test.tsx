import 'react-native';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@dooboo-ui/theme';
import WebView from '../WebView';
import { createStackNavigator } from '@react-navigation/stack';
import { render } from '@testing-library/react-native';

type ParamList = {
  WebView: {
    uri: string;
  };
};

const Stack = createStackNavigator<ParamList>();

const Container: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WebView"
            component={WebView}
            initialParams={{
              uri: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const component = <Container />;

describe('[WebView] screen', () => {
  it('renders without crashing', () => {
    const json = render(component).toJSON();

    expect(json).toMatchSnapshot();
  });
});
