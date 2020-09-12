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
    version: '1.0.0',
    orientation: 'default',
    icon: './assets/icon.png',
    splash: {
      resizeMode: 'cover',
      image: './assets/splash.png',
      tabletImage: './assets/splashTablet.png',
    },
    scheme: 'hackatalk',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: [
      '**/*',
    ],
    facebookDisplayName: 'hackatalk',
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.dooboolab.hackatalk',
      splash: {
        resizeMode: 'cover',
        image: './assets/splash.png',
        tabletImage: './assets/splashTablet.png',
      },
    },
    android: {
      package: 'com.dooboolab.hackatalk',
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
      googleClientId: process.env.googleClientId,
      googleSecret: process.env.googleSecret,
    },
    description: 'Opensource chat app',
    githubUrl: 'https://github.com/dooboolab/hackatalk',
  },
};
