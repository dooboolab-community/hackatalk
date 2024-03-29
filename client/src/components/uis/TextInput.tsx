import React, {forwardRef, useState} from 'react';
import type {ReturnKeyTypeOptions, TextStyle, ViewStyle} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import type {Ref} from 'react';
import styled from '@emotion/native';
import {useDooboo} from 'dooboo-ui';

const StyledLabelText = styled.Text<{focused: boolean}>`
  color: ${({focused, theme}) =>
    focused ? theme.role.primary : theme.text.disabled};
  margin-bottom: 8px;
  font-size: 12px;
`;

const WrapperView = styled.View`
  align-self: stretch;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const StyledTextInputContainer = styled.View<{isFocused?: boolean}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${({isFocused, theme}): string =>
    isFocused ? theme.role.primary : theme.bg.border};
  border-radius: 3px;
  margin-bottom: 8px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  align-self: stretch;
  color: ${({theme}) => theme.text.basic};
  font-size: 16px;
  padding: 22px 20px;
  border: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledStatusMark = styled(Ionicons)(({theme}) => ({
  size: 24,
  color: theme.role.secondary,
  paddingRight: '5%',
}));

interface Props {
  testID?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  isPassword?: boolean;
  multiline?: boolean;
  txtLabel?: string;
  txtHint?: string;
  txt?: string;
  onFocus?: () => void;
  onTextChanged?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  error?: string;
}

function Shared(props: Props, ref: Ref<any>): React.ReactElement {
  const [focused, setFocused] = useState(false);
  const {theme} = useDooboo();

  const renderTxtLabel = (): React.ReactElement | null => {
    if (props.txtLabel) {
      return (
        <StyledLabelText focused={focused}>{props.txtLabel}</StyledLabelText>
      );
    }

    return null;
  };

  return (
    <WrapperView>
      {renderTxtLabel()}
      <StyledTextInputContainer isFocused={focused}>
        <StyledTextInput
          ref={ref}
          testID={props.testID}
          placeholderTextColor={
            focused ? theme.role.primary : theme.text.placeholder
          }
          underlineColorAndroid="transparent" // android fix
          autoCapitalize="none"
          autoCorrect={false}
          multiline={props.multiline}
          onChangeText={props.onTextChanged}
          value={props.txt}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
          placeholder={props.txtHint}
          // onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          secureTextEntry={props.isPassword}
          textContentType="none" // to disable autofill on iOS
        />
        {!!props.txt && !props.error && (
          <StyledStatusMark name="md-checkmark" />
        )}
      </StyledTextInputContainer>
    </WrapperView>
  );
}

export default forwardRef(Shared);
