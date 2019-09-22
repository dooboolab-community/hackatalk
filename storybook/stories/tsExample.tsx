import { Text, View } from 'react-native';

import React from 'react';
import { storiesOf } from '@storybook/react-native';

interface Props {
  text: string;
}
const Simple: React.FC<Props> = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{props.text}</Text>
  </View>
);

storiesOf('Test', module).add('default', () => (
  <Simple text={'Typescript works!'} />
));
