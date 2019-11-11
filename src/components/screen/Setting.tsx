import { Alert, SafeAreaView, SectionList, SectionListData } from 'react-native';
import { DefaultNavigationProps, SettingsOption } from '../../types';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import styled, {
  DefaultTheme, withTheme,
} from 'styled-components/native';
import Button from '../shared/Button';
import { IC_FACEBOOK } from '../../utils/Icons';
import Modal from 'react-native-modalbox';
import TextInput from '../shared/TextInput';
import { getString } from '../../../STRINGS';

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
  background-color: ${({ theme }): string => theme.background};
`;

const HeaderContainer = styled.View`
  height: 52px;
  justify-content: center;
  margin-left: 10px;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }): string => theme.lineColor};
`;

const SectionHeader = styled.Text`
  color: ${({ theme }): string => theme.fontSubColor};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  height: 52px;
  align-items: center;
  /* border-width: 1px; */
`;

const ItemIcon = styled.Image`
  width: 32px;
  height: 32px;
  resize-mode: contain;
  border-width: 1;
  border-color: ${({ theme }): string => theme.lineColor};
  border-radius: 4;
  margin-right: 10px;
`;

const ItemLabel = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  flex: 1;
`;

const ModalHeader = styled.View`
  height: 52px;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 20px;
`;

const ModalCloseButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const InnerContainer = styled.View`
  padding: 15px;
`;

const TextInputTitle = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 16px;
  margin-bottom: 15px
`;

function SectionItem(option: SettingsOption, theme: DefaultTheme): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress}>
      {option.icon ? <ItemIcon source={option.icon} /> : null}
      <ItemLabel>{option.label}</ItemLabel>
      <FontAwesome name="angle-right" size={32} color={theme.fontColor} />
    </ItemContainer>
  );
}

interface Props {
  navigation: DefaultNavigationProps<'Setting'>;
  theme: DefaultTheme;
  checkPassword(password: string): Promise<boolean>;
}

function SettingScreen(props: Props): React.ReactElement {
  const { theme, checkPassword } = props;
  const [isChangePwModalVisible, setChangePwModalVisible] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');
  const checkCurrentPw = (): void => {
    checkPassword(currentPw)
      .then((result) => {
        if (result) {
          // TODO: enter new password page
        } else {
          Alert.alert(getString('PASSWORD_MUST_MATCH'));
        }
      });
  };
  const settings: SectionListData<SettingsOption>[] = [
    {
      title: '계정정보',
      data: [{
        icon: IC_FACEBOOK,
        label: 'facebook으로 로그인 됨',
        onPress: (): void => {
          setChangePwModalVisible(true);
        },
      }],
    },
  ];
  return (
    <Container>
      <SectionList
        testID="mySectionList"
        sections={settings}
        renderItem={({ item }): React.ReactElement => SectionItem(item, props.theme)}
        keyExtractor={(item: SettingsOption): string => item.label}
        renderSectionHeader={({ section: { title } }): React.ReactElement => (
          <HeaderContainer>
            <SectionHeader>{title}</SectionHeader>
          </HeaderContainer>
        )}
      />
      <Modal
        isOpen={isChangePwModalVisible}
        coverScreen
        backButtonClose
        style={{ backgroundColor: theme.background }}>
        <SafeAreaView>
          <ModalHeader>
            <ModalTitle>{getString('PASSWORD_CHANGE')}</ModalTitle>
            <ModalCloseButton
              onPress={(): void => setChangePwModalVisible(false)}>
              <Ionicons name="md-close" size={32} />
            </ModalCloseButton>
          </ModalHeader>
          <InnerContainer>
            <TextInputTitle>{getString('PASSWORD_CURRENT')}</TextInputTitle>
            <TextInput/>
          </InnerContainer>
          <Button
            testID="checkCurrentPwBtn"
            onPress={checkCurrentPw}/>
        </SafeAreaView>
      </Modal>
    </Container>
  );
}

export default withTheme(SettingScreen);
