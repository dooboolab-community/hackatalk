import 'dotenv/config';

import {version} from './package.json';

export default {
  expo: {
    name: 'HackaTalk',
    displayName: 'HackaTalk',
    slug: 'HackaTalk-Expo',
    privacy: 'public',
    sdkVersion: "40.0.0",
    platforms: [
      'ios',
      'android',
      'web',
    ],
    version,
    orientation: 'default',
    icon: './assets/icon.png',
    splash: {
      resizeMode: 'cover',
      image: './assets/splash.png',
      tabletImage: './assets/splashTablet.png',
    },
    userInterfaceStyle: 'automatic',
    scheme: 'HackaTalk',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    facebookDisplayName: 'HackaTalk',
    facebookScheme: `fb${process.env.facebookAppId}`,
    ios: {
      userInterfaceStyle: 'light',
      supportsTablet: true,
      bundleIdentifier: 'com.dooboolab.hackatalk',
      splash: {
        resizeMode: 'cover',
        image: './assets/splash.png',
        tabletImage: './assets/splashTablet.png',
      },
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
      config: {
        googleMobileAdsAppId: 'ca-app-pub-7837089095803162~5303560311',
      },
    },
    android: {
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
      config: {
        googleMobileAdsAppId: 'ca-app-pub-7837089095803162~5303560311',
      },
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
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'dooboolab',
          project: 'hackatalk',
          authToken: process.env.sentryAuthToken,
        },
      },
    ],
  },
};
