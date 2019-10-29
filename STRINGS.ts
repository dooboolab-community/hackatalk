import * as Localization from 'expo-localization';

import i18n from 'i18n-js';

const en = {
  LOADING: 'Loading...',
  HELLO: 'Hello',
  LOGIN: 'Login',
  EMAIL: 'Email',
  PASSWORD: 'Password',
  SIGN_UP: 'Sign Up',
  LOGOUT: 'Logout',
  FORGOT_PW: 'Forgot password?',
  FIND_PW: 'Find Password',
  NAME: 'Name',
  STATUS_MSG: 'Status message',
  REGISTER: 'Register',
  SEND_LINK: 'Send Link',
  FRIEND: 'Friend',
  MESSAGE: 'Message',
  MY_PROFILE: 'My profile',
  UPDATE: 'Update',
  NO_CONTENT: 'No content',
  ADD_FRIEND: 'Add',
  DELETE_FRIEND: 'Delete',
  SEARCH_USER: 'Search User',
  CHAT: 'Chat',
  SEND: 'Send',
  WRITE_MESSAGE: 'Write message...',
  ERROR: 'Error',
  FRIEND_ADDED: 'Added to your friend.',
  FRIEND_ALREADY_ADDED: 'Already your friend.',
  SETTING: 'Setting',
  SIGN_IN_WITH_GOOGLE: 'Sign in with Google',
  SIGN_IN_WITH_FACEBOOK: 'Sign in with Facebook',
  STATUS: 'Status',
};

const ko = {
  LOADING: '로딩중...',
  HELLO: '안녕하세요',
  LOGIN: '로그인',
  LOGOUT: '로그아웃',
  EMAIL: '이메일',
  PASSWORD: '비밀번호',
  SIGN_UP: '회원가입',
  FORGOT_PW: '비밀번호를 잊어버리셨나요?',
  FIND_PW: '비밀번호 찾기',
  NAME: '이름',
  STATUS_MSG: '상태메세지',
  REGISTER: '가입',
  SEND_LINK: '링크 보내기',
  FRIEND: '친구',
  MESSAGE: '메세지',
  MY_PROFILE: '나의 프로필',
  UPDATE: '수정',
  NO_CONTENT: '컨텐츠가 없습니다',
  ADD_FRIEND: '친구추가',
  DELETE_FRIEND: '친구삭제',
  SEARCH_USER: '사용자 검색',
  CHAT: '채팅',
  SEND: '보내기',
  WRITE_MESSAGE: '메세지를 입력해주세요…',
  ERROR: '에러',
  FRIEND_ADDED: '친구로 등록되었습니다.',
  FRIEND_ALREADY_ADDED: '이미 친구입니다.',
  SETTING: '설정',
  SIGN_IN_WITH_GOOGLE: '구글 계정으로 시작하기',
  SIGN_IN_WITH_FACEBOOK: '페이스북 계정으로 시작하기',
  STATUS: '상태 메세지',
};

i18n.fallbacks = true;
i18n.translations = { en, ko };
i18n.locale = Localization.locale;

export const getString = (param: string, mapObj?: object): string => {
  if (mapObj) {
    i18n.t(param, mapObj);
  }
  return i18n.t(param);
};
