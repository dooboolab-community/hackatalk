import { FlatList, GestureResponderEvent } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styled, {
  DefaultTheme,
  ThemeProps,
  withTheme,
} from 'styled-components/native';

import { AppContext } from '../../contexts/AppContext';
import Icon5 from '@expo/vector-icons/FontAwesome5';
import SwitchToggle from 'react-native-switch-toggle';
import { ThemeType } from '../../utils/theme';

interface SettingProps extends ThemeProps<DefaultTheme> {}

const StyledViewChat = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledSettingListItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  height: 80px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  align-items: center;
  padding: 0 20px;
`;

const StyledContentView = styled.View`
  display: flex;
  flex-direction: row;
`;
const StyledTitleText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const StyledIconWrapperText = styled.Text`
  margin-right: 20px;
`;

const SettingListItem = ({ item }) => (
  <StyledSettingListItemView>
    <StyledContentView>
      <StyledIconWrapperText>{item.icon}</StyledIconWrapperText>
      <StyledTitleText>{item.title}</StyledTitleText>
    </StyledContentView>
    {item.rightItem}
  </StyledSettingListItemView>
);

const Setting: React.FC<SettingProps> = ({ theme }) => {
  const text = theme.colors.text;
  const dodgerBlue = theme.colors.dodgerBlue;
  const { state, dispatch } = useContext(AppContext);
  const [isNightMode, setIsNightMode] = useState(
    state.theme === ThemeType.NIGHT,
  );

  const handleOnPress = (event: GestureResponderEvent) => {
    setIsNightMode(!isNightMode);
  };

  useEffect(() => {
    if (isNightMode) {
      dispatch({
        type: 'change-theme-mode',
        payload: { theme: ThemeType.NIGHT },
      });
    } else {
      dispatch({
        type: 'change-theme-mode',
        payload: { theme: ThemeType.LIGHT },
      });
    }
  }, [isNightMode]);

  const config = [
    {
      icon: <Icon5 name='moon' size={20} color={text} solid />,
      title: 'Night Mode',
      rightItem: (
        <SwitchToggle
          // @ts-ignore
          onPress={handleOnPress}
          containerStyle={{
            width: 48,
            height: 24,
            borderRadius: 25,
            backgroundColor: '#ccc',
            padding: 5,
          }}
          circleStyle={{
            width: 19,
            height: 19,
            borderRadius: 19,
            backgroundColor: 'white',
          }}
          switchOn={isNightMode}
          circleColorOn={dodgerBlue}
        />
      ),
    },
  ];

  return (
    <StyledViewChat>
      <FlatList
        style={{ alignSelf: 'stretch' }}
        keyExtractor={(item, index) => index.toString()}
        data={config}
        renderItem={SettingListItem}
      />
    </StyledViewChat>
  );
};

export default withTheme(Setting);
