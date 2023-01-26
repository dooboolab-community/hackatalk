import type {LinkingOptions} from '@react-navigation/native';
import type {RootStackParamList} from './RootStackNavigator';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['https://hackatalk.dev', 'hackatalk://'],
  enabled: true,
  config: {
    screens: {
      MainStack: {
        screens: {
          MainTab: {
            screens: {
              Channel: 'channels',
              Friend: 'friends',
            },
          },
          ProfileUpdate: 'profile-update',
          BlockedUser: 'blocked-user',
          ChangePw: 'change_pw',
          ChannelCreate: 'channel-create',
          Message: 'message/:channelId',
          PinchZoomViewPager: 'pinchzoom',
          Report: 'reports/:name/:userId',
          SearchUser: 'search-user',
          Settings: 'settings',
        },
      },
      AuthStack: {
        screens: {
          SignIn: 'sign-in',
          SignUp: 'sign-up',
          VerifyEmail: 'verify-email/:email',
          LicenseAgreement: 'license-agreement',
          FindPw: 'find-pw',
        },
      },
      ImageSlider: 'images',
      NotFound: '404',
      WebView: 'webview/:uri',
    },
  },
};

export default linking;
