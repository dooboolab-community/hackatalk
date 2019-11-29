import FindPw from '../screen/FindPW';
import Login from '../screen/Login';
import React from 'react';
import SignUp from '../screen/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import { getString } from '../../../STRINGS';
import { useThemeContext } from '@dooboo-ui/native-theme';

const Stack = createStackNavigator();

function AuthNavigator(): React.ReactElement {
  const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTintColor: theme.fontColor,
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{
        header: null,
      }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{
        title: getString('SIGN_UP'),
      }}/>
      <Stack.Screen name="FindPw" component={FindPw} options={{
        title: getString('FIND_PW'),
      }}/>
    </Stack.Navigator>
  );
}

export default AuthNavigator;
