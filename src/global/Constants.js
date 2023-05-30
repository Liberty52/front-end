import facebookLogo from '../image/icon/facebook-logo.png';
import { SOCIAL_LOGIN_URL } from "./url";

export const SOCIAL_LOGIN_PROVIDER = {
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


export const HTML_EDITOR_MODE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
};

export const API_LOGIN_GOOGLE = `${SOCIAL_LOGIN_URL.GOOGLE}/google`;
export const API_LOGIN_FACEBOOK = `${SOCIAL_LOGIN_URL.FACEBOOK}/facebook`;
export const API_LOGIN_NAVER = `${SOCIAL_LOGIN_URL.NAVER}/naver`;

export const MOUNTING_METHOD = ["이젤 거치형", "벽걸이형"]
export const BASIC_MATERIAL = ["1mm 두께 승화전사 인쇄용 알루미늄시트"]
export const ADDITIONAL_MATERIAL = ["유광실버", "무광실버", "유광백색", "무광백색"]
