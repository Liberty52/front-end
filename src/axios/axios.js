import axios from 'axios';

const request = axios.create({ baseURL: 'https://liberty52.com:444/' });

request.interceptors.response.use(
  (response) => {
    return response;
  },
   async (error) => {
    if (error.response.status === 401) {
      if (error.response.data.error_name === "ACCESS_TOKEN_EXPIRED") {
        const originalRequest = error.config;
        const refreshToken =  localStorage.getItem("REFRESH_TOKEN");
        if(refreshToken === null){
          alert("인증 토큰이 만료되었습니다. 다시 로그인 후 이용해주세요.")
          return Promise.reject(error);
        }
        // token refresh 요청
        const  response  = await request.get(
          `/auth/refresh`, // token refresh api
          {
            headers : {
              "X-REFRESHTOKEN" : refreshToken
            },
          }
        );
        localStorage.setItem("ACCESS_TOKEN", response.headers.access);
        localStorage.setItem("REFRESH_TOKEN", response.headers.refresh)

        originalRequest.headers.Authorization = `${response.headers.access}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return request(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);



export default request;
