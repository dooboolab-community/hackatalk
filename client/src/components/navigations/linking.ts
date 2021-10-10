import {LinkingOptions} from '@react-navigation/native';
import {RootStackParamList} from './RootStackNavigator';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['https://hackatalk.dev', 'hackatalk://'],
  enabled: true,
  config: {
    screens: {
      MainStack: {
        screens: {
          MainTab: {
            screens: {
              Channel: 'channel',
              Friend: 'friend',
            },
          },
          ProfileUpdate: 'profile_update',
          BlockedUser: 'blocked_user',
          ChangePw: 'change_pw',
          ChannelCreate: 'channel_create',
          Message: 'message',
          PinchZoomViewPager: 'pinchzoom',
          Report: 'report',
          SearchUser: 'search_user',
          Settings: 'settings',
        },
      },
      AuthStack: {
        screens: {
          SignIn: 'sign_in',
          SignUp: 'sign_up',
          VerifyEmail: 'verify_email',
          LicenseAgreement: 'license_agreement',
          FindPw: 'find_pw',
        },
      },
    },
  },
};

export default linking;
