import FindPw from '../screen/FindPw';
import Login from '../screen/Login';
import { ScreenProps } from './SwitchNavigator';
import SignUp from '../screen/SignUp';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ screenProps }): object => {
        const { theme } = screenProps as ScreenProps;
        return {
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerTintColor: theme.fontColor,
        };
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ screenProps }): object => {
        const { theme } = screenProps as ScreenProps;
        return {
          title: getString('SIGN_UP'),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.fontColor,
        };
      },
    },
    FindPw: {
      screen: FindPw,
      navigationOptions: ({ screenProps }): object => {
        const { theme } = screenProps as ScreenProps;
        return {
          title: getString('FIND_PW'),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.fontColor,
          },
          headerTintColor: theme.fontColor,
        };
      },
    },
  },
  {
    initialRouteName: 'Login',
    // transitionConfig: () => ({ screenInterpolator: StackViewStyleInterpolator.forHorizontal }),
  },
);

export default StackNavigator;
