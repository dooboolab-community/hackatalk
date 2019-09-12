import {
  ActivityIndicator,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import { ThemeConsumer } from 'styled-components/native';

interface Props {
  isDarkContent: boolean;
}

interface State {}

function Shared(props: Props, state: State) {
  const statusColor: 'default' | 'light-content' | 'dark-content' =
    Platform.OS === 'android'
      ? 'default'
      : props.isDarkContent
      ? 'dark-content'
      : 'light-content';
  return (
    <ThemeConsumer>
      {({ colors: { dodgerBlue } }) => (
        <StatusBar barStyle={statusColor} backgroundColor={dodgerBlue} />
      )}
    </ThemeConsumer>
  );
}

Shared.defaultProps = {
  isDarkContent: false,
};

export default Shared;
