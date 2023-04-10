import { SOCIAL_LOGIN_URL } from "./url";
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

export { SOCIAL_LOGIN_PROVIDER };
