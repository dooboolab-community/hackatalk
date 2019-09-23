import FindPw from '../screen/FindPw';
import Login from '../screen/Login';
import { ScreenProps } from './SwitchNavigator';
import Setting from '../screen/Setting';
import SignUp from '../screen/SignUp';
import { createStackNavigator } from 'react-navigation-stack';
import { getString } from '../../../STRINGS';

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({
        screenProps,
      }: {
        screenProps: ScreenProps;
      }): object => {
        const { theme } = screenProps;
        return {
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
        };
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: ({
        screenProps,
      }: {
        screenProps: ScreenProps;
      }): object => {
        const { theme } = screenProps;
        return {
          title: getString('SIGNUP'),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.fontColor,
          },
        };
      },
    },
    FindPw: {
      screen: FindPw,
      navigationOptions: ({
        screenProps,
      }: {
        screenProps: ScreenProps;
      }): object => {
        const { theme } = screenProps;
        return {
          title: getString('FIND_PW'),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.fontColor,
          },
        };
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: ({
        screenProps,
      }: {
        screenProps: ScreenProps;
      }): object => {
        const { theme } = screenProps;
        return {
          title: getString('SETTING'),
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: theme.fontColor,
          },
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
