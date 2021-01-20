import {StyleSheet, Text, View, ViewStyle} from 'react-native';

import React from 'react';

interface Styles {
  wrapper: ViewStyle;
}

const styles: Styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

interface Props {
  style: ViewStyle;
  children?: string;
}

function Shared(props: Props): React.ReactElement {
  return (
    <View style={props.style}>
      <Text
        style={{
          fontSize: 14,
          color: 'rgb(155,155,155)',
          alignSelf: 'center',
        }}>
        {props.children}
      </Text>
    </View>
  );
}

Shared.defaultProps = {
  style: styles.wrapper,
};

export default Shared;
