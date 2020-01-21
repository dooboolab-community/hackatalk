import React, { FC } from 'react';

import { Button as OriginalButton } from '@dooboo-ui/native';
import { ViewStyle } from 'react-native';

type ComponentTypes = React.ComponentClass<any> | React.FunctionComponent<any>;

type InferProps<
  Component extends ComponentTypes
> = Component extends React.ComponentClass<infer Props>
  ? Props
  : Component extends React.FunctionComponent<infer Props>
  ? Props
  : never;

const Button: FC<InferProps<typeof OriginalButton> & {
  colorfulShadow?: boolean;
}> = (props) => {
  const { containerStyle, colorfulShadow, ...rest } = props;
  return (
    <OriginalButton
      containerStyle={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        ...containerStyle,
      }}
      {...rest}
    />
  );
};

export default Button;
