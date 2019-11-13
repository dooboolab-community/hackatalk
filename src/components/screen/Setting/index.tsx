import { Alert, KeyboardAvoidingView, SafeAreaView, SectionList, SectionListData, View } from 'react-native';
import {
  Container,
  HeaderContainer,
  InnerContainer,
  ItemContainer,
  ItemIcon,
  ItemLabel,
  ModalCloseButton,
  ModalHeader,
  ModalTitle,
  SectionHeader,
  StyledTextInput,
} from './styles';
import { DefaultNavigationProps, SettingsOption } from '../../../types';
import {
  DefaultTheme, withTheme,
} from 'styled-components/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import Button from '../../shared/Button';
import { IC_FACEBOOK } from '../../../utils/Icons';
import Modal from 'react-native-modalbox';
import { getString } from '../../../../STRINGS';
import { useSafeArea } from 'react-native-safe-area-context';

function SectionItem(option: SettingsOption, theme: DefaultTheme): React.ReactElement {
  return (
    <ItemContainer onPress={option.onPress} testID={option.testID}>
      {option.icon ? <ItemIcon source={option.icon} /> : null}
      <ItemLabel>{option.label}</ItemLabel>
      <FontAwesome name="angle-right" size={32} color={theme.fontColor} />
    </ItemContainer>
  );
}

interface Props {
  navigation: DefaultNavigationProps<'Setting'>;
  theme: DefaultTheme;
}

function SettingScreen(props: Props): React.ReactElement {
  const { theme } = props;
  const insets = useSafeArea();
  const modal: React.MutableRefObject<Modal|null> = useRef(null);
  const [currentPwVerified, setCurrentPwVerified] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwCheck, setNewPwCheck] = useState('');
  const checkCurrentPw = (): void => {
    if (currentPw === 'right') {
      setCurrentPwVerified(true);
    } else {
      Alert.alert(getString('PASSWORD_MUST_MATCH'));
    }
  };
  const changePassword = async (): Promise<void> => {
    if (newPw === newPwCheck) {
      // TODO change password api call
      Alert.alert('', 'Password changed.', [
        {
          text: getString('OK'),
          onPress: (): void => {
            if (modal.current) {
              modal.current.close();
            }
          },
        },
      ]);
    } else {
      Alert.alert(getString('PASSWORD_MUST_MATCH'));
    }
  };
  const settings: SectionListData<SettingsOption>[] = [
    {
      title: '계정정보',
      data: [{
        icon: IC_FACEBOOK,
        label: 'facebook으로 로그인 됨',
        onPress: (): void => {
          modal.current && modal.current.open();
        },
        testID: 'changePwItem',
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
        ref={modal}
        keyboardTopOffset={0}
        coverScreen
        backButtonClose
        onClosed={(): void => {
          setCurrentPwVerified(false);
          setCurrentPw('');
          setNewPw('');
          setNewPwCheck('');
        }}
        style={{ backgroundColor: theme.background }}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ModalHeader>
              <ModalTitle>{getString('PASSWORD_CHANGE')}</ModalTitle>
              <ModalCloseButton
                testID="closeBtn"
                onPress={(): void | null => modal.current && modal.current.close()}>
                <Ionicons name="md-close" size={32} color={theme.fontColor}/>
              </ModalCloseButton>
            </ModalHeader>
            {
              currentPwVerified
                ? <InnerContainer>
                  <StyledTextInput
                    key="newPwTextInput"
                    testID="newPwTextInput"
                    isPassword
                    onTextChanged={(pw): void => setNewPw(pw)}
                    txtLabel={getString('PASSWORD_NEW')}/>
                  <StyledTextInput
                    key="newPwCheckTextInput"
                    testID="newPwCheckTextInput"
                    isPassword
                    onTextChanged={(pw): void => setNewPwCheck(pw)}
                    txtLabel={getString('PASSWORD_NEW_CHECK')}/>
                </InnerContainer>
                : <InnerContainer>
                  <StyledTextInput
                    key="currentPwTextInput"
                    testID="currentPwTextInput"
                    isPassword
                    onTextChanged={(pw): void => setCurrentPw(pw)}
                    txtLabel={getString('PASSWORD_CURRENT')}/>
                </InnerContainer>
            }
            <Button
              testID="checkCurrentPwBtn"
              onPress={currentPwVerified ? changePassword : checkCurrentPw}>
              {getString('NEXT')}
            </Button>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </Container>
  );
}

export default withTheme(SettingScreen);
