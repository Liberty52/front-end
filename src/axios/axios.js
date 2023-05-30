import axios from "axios";
import { TOKEN_REFRESH } from "../constants/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token";
import { GLOBAL_ERROR } from "../constants/error-name";
import { refreshToken } from "./login/Login";

const request = axios.create({ baseURL: "https://liberty52.com:444/" });

request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      if (error.response.data.error_name === GLOBAL_ERROR.ACCESS_TOKEN_EXPIRED) {
        const originalRequest = error.config;
        const savedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (savedRefreshToken === null) {
          alert("인증 토큰이 만료되었습니다. 다시 로그인 후 이용해주세요.");
          sessionStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          window.location.href = "/login";
          return Promise.reject(error);
        }
        // token refresh 요청
        try {
          const response = await refreshToken();
          sessionStorage.setItem(ACCESS_TOKEN, response.headers.access);
          localStorage.setItem(REFRESH_TOKEN, response.headers.refresh);

          originalRequest.headers.Authorization = `${response.headers.access}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return request(originalRequest);
        } catch (e) {
          sessionStorage.removeItem(ACCESS_TOKEN);
          localStorage.removeItem(REFRESH_TOKEN);
          alert("다시 로그인해주세요");
          window.location.href = "/login";
        }

      }
    }
    return Promise.reject(error);
  }
);


export default request;
