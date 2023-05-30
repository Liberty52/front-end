<<<<<<< Updated upstream
import { SOCIAL_LOGIN_URL } from './url';
=======
/*import facebookLogo from '../image/icon/facebook-logo.png';
import { SOCIAL_LOGIN_URL } from "./url";
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
const HTML_EDITOR_MODE = {
  ADD : "ADD",
  UPDATE : "UPDATE"
}
=======
export const HTML_EDITOR_MODE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
};
*/
import facebookLogo from '../image/icon/facebook-logo.png';

export const SOCIAL_LOGIN_URL = {
  NAVER: '/auth/naver',
  KAKAO: '/auth/kakao',
  GOOGLE: '/auth/google',
  FACEBOOK: '/auth/facebook',
};

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
/////////////////////////
export const HTML_EDITOR_MODE = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
};
>>>>>>> Stashed changes

export { SOCIAL_LOGIN_PROVIDER, HTML_EDITOR_MODE };
export const API_LOGIN_GOOGLE = `${SOCIAL_LOGIN_URL}/google`;
export const API_LOGIN_FACEBOOK = `${SOCIAL_LOGIN_URL}/facebook`;
export const API_LOGIN_NAVER = `${SOCIAL_LOGIN_URL}/naver`;