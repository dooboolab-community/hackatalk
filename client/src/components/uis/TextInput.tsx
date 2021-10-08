import React, {Ref, forwardRef, useState} from 'react';
import {ReturnKeyTypeOptions, TextStyle, ViewStyle} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import styled from '@emotion/native';
import {useTheme} from 'dooboo-ui';

const StyledLabelText = styled.Text<{focused: boolean}>`
  color: ${({focused, theme}): string =>
    focused ? theme.primary : theme.disabled};
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
    isFocused ? theme.primary : theme.line};
  border-radius: 3px;
  margin-bottom: 8px;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  align-self: stretch;
  color: ${({theme}) => theme.text};
  font-size: 16px;
  padding: 22px 20px;
  border: none;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledStatusMark = styled(Ionicons)(({theme}) => ({
  size: 24,
  color: theme.secondary,
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
  const {theme} = useTheme();

  const renderTxtLabel = (): React.ReactElement | null => {
    if (props.txtLabel)
      return (
        <StyledLabelText focused={focused}>{props.txtLabel}</StyledLabelText>
      );

    return null;
  };

  return (
    <WrapperView>
      {renderTxtLabel()}
      <StyledTextInputContainer isFocused={focused}>
        <StyledTextInput
          ref={ref}
          testID={props.testID}
          placeholderTextColor={focused ? theme.primary : theme.placeholder}
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
          textContentType="none" // to disable autoifill on iOS
        />
        {!!props.txt && !props.error && (
          <StyledStatusMark name="md-checkmark" />
        )}
      </StyledTextInputContainer>
    </WrapperView>
  );
}

export default forwardRef(Shared);
