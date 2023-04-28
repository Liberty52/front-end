import { SOCIAL_LOGIN_URL } from './url';

const SOCIAL_LOGIN_PROVIDER = {
  NAVER: {
    text: "네이버 로그인",
    url: SOCIAL_LOGIN_URL.NAVER,
    css: "naver",
  },
  KAKAO: {
    text: "카카오 로그인",
    url: SOCIAL_LOGIN_URL.KAKAO,
    css: "kakao",
  },
  GOOGLE: {
    text: "구글 로그인",
    url: SOCIAL_LOGIN_URL.GOOGLE,
    css: "google",
  },
  FACEBOOK: {
    text: "페이스북 로그인",
    url: SOCIAL_LOGIN_URL.FACEBOOK,
    css: "facebook",
  },
};

const HTML_EDITOR_MODE = {
  ADD : "ADD",
  UPDATE : "UPDATE"
}

export { SOCIAL_LOGIN_PROVIDER, HTML_EDITOR_MODE };
export const API_LOGIN_GOOGLE = `${SOCIAL_LOGIN_URL}/google`;
export const API_LOGIN_FACEBOOK = `${SOCIAL_LOGIN_URL}/facebook`;
export const API_LOGIN_NAVER = `${SOCIAL_LOGIN_URL}/naver`;