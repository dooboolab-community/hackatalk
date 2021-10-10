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
              Channel: 'channels',
              Friend: 'friends',
            },
          },
          ProfileUpdate: 'profile_update',
          BlockedUser: 'blocked_user',
          ChangePw: 'change_pw',
          ChannelCreate: 'channel_create',
          Message: 'message/:channelId',
          PinchZoomViewPager: 'pinchzoom',
          Report: 'reports/:name/:userId',
          SearchUser: 'search_user',
          Settings: 'settings',
        },
      },
      AuthStack: {
        screens: {
          SignIn: 'sign_in',
          SignUp: 'sign_up',
          VerifyEmail: 'verify_email/:email',
          LicenseAgreement: 'license_agreement',
          FindPw: 'find_pw',
        },
      },
      ImageSlider: 'images',
      NotFound: '404',
      WebView: 'webview/:uri',
    },
  },
};

export default linking;
