import { SOCIAL_LOGIN_URL } from './url';
import facebookLogo from '../image/icon/facebook-logo.png';

const SOCIAL_LOGIN_PROVIDER = {
  NAVER: {
    img: 'https://vendor-cdn.imweb.me/images/naver_login2x.png',
    url: SOCIAL_LOGIN_URL.NAVER,
    css: 'naver',
  },
  KAKAO: {
    img: 'https://vendor-cdn.imweb.me/images/kakao_icon.png',
    url: SOCIAL_LOGIN_URL.KAKAO,
    css: 'kakao',
  },
  GOOGLE: {
    img: 'https://vendor-cdn.imweb.me/images/google_icon.png',
    url: SOCIAL_LOGIN_URL.GOOGLE,
    css: 'google',
  },
  FACEBOOK: {
    img: facebookLogo,
    url: SOCIAL_LOGIN_URL.FACEBOOK,
    css: 'facebook',
  },
};

const HTML_EDITOR_MODE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
};

export { SOCIAL_LOGIN_PROVIDER, HTML_EDITOR_MODE };
export const API_LOGIN_GOOGLE = `${SOCIAL_LOGIN_URL}/google`;
export const API_LOGIN_FACEBOOK = `${SOCIAL_LOGIN_URL}/facebook`;
export const API_LOGIN_NAVER = `${SOCIAL_LOGIN_URL}/naver`;
