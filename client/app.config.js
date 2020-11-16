import 'dotenv/config';

export default {
  expo: {
    name: 'HackaTalk',
    slug: 'HackaTalk-Expo',
    privacy: 'public',
    platforms: [
      'ios',
      'android',
      'web',
    ],
    version: '1.0.5',
    orientation: 'default',
    icon: './assets/icon.png',
    splash: {
      resizeMode: 'cover',
      image: './assets/splash.png',
      tabletImage: './assets/splashTablet.png',
    },
    userInterfaceStyle: 'automatic',
    scheme: 'hackatalk',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    facebookDisplayName: 'hackatalk',
    facebookScheme: 'fb476130476434051',
    ios: {
      userInterfaceStyle: 'light',
      supportsTablet: true,
      bundleIdentifier: 'com.dooboolab.hackatalk',
      splash: {
        resizeMode: 'cover',
        image: './assets/splash.png',
        tabletImage: './assets/splashTablet.png',
      },
      buildNumber: '1.0.5',
      usesAppleSignIn: true,
      infoPlist: {
        NSCameraUsageDescription:
          'HackaTalk would like to take your picture and share your photo with users in HackaTalk.',
        NSPhotoLibraryAddUsageDescription:
          'HackaTalk would like to save photos that you have selected to your photo gallery',
        NSPhotoLibraryUsageDescription:
          'HackaTalk would like to access your gallery for you to pick one and share with others.',
      },
      appStoreUrl: 'https://apps.apple.com/us/app/hackatalk/id1479617602',
    },
    android: {
      versionCode: 5,
      userInterfaceStyle: 'dark',
      package: 'com.dooboolab.hackatalk',
      useNextNotificationsApi: true,
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.dooboolab.hackatalk',
      permissions: [
        'CAMERA',
        'CAMERA_ROLL',
        'READ_EXTERNAL_STORAGE',
        'USE_FINGERPRINT',
        'WRITE_EXTERNAL_STORAGE',
        'NOTIFICATIONS',
        'USER_FACING_NOTIFICATIONS',
      ],
      googleServicesFile: './google-services.json',
    },
    packagerOpts: {
      config: './metro.config.js',
      sourceExts: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'expo.ts',
        'expo.tsx',
        'expo.js',
        'expo.jsx',
        'json',
        'wasm',
        'svg',
      ],
    },
    extra: {
      GRAPHQL_URL: process.env.GRAPHQL_URL,
      ROOT_URL: process.env.ROOT_URL,
      facebookAppId: process.env.facebookAppId,
      facebookSecret: process.env.facebookSecret,
      googleWebClientId: process.env.googleWebClientId,
      googleAndroidClientId: process.env.googleAndroidClientId,
      googleIOSClientId: process.env.googleAndroidIOSId,
    },
    description: 'Opensource chat app',
    githubUrl: 'https://github.com/dooboolab/hackatalk',
  },
  web: {
    relatedApplications: [
      {
        platform: 'itunes',
        url: 'https://apps.apple.com/us/app/hackatalk/id1479617602',
        id: 'com.dooboolab.hackatalk',
      },
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=com.dooboolab.hackatalk',
        id: 'com.dooboolab.hackatalk',
      },
    ],
    preferRelatedApplications: true,
  },
};
