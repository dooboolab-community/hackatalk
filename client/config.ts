import Constants from 'expo-constants';

const extra = Constants?.manifest?.extra;

export const GRAPHQL_URL = extra?.GRAPHQL_URL;
export const SUBSCRIPTION_URL = extra?.SUBSCRIPTION_URL;
export const ROOT_URL = extra?.ROOT_URL;
export const facebookAppId = extra?.facebookAppId;
export const googleWebClientId = extra?.googleWebClientId;
export const googleAndroidClientId = extra?.googleAndroidClientId;
export const googleIOSClientId = extra?.googleIOSClientId;
