import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import cookie from 'react-cookies';
import { ACCESS_TOKEN, GUEST_COOKIE } from '../../constants/token';
import { LOGIN } from '../../constants/path';

export default function Cookie() {
  let navigate = useNavigate();
  const getRandom = Math.floor(Math.random() * 1000000) + 1;
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      //   ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    } else {
      if (cookie.load(GUEST_COOKIE)) {
        //   cookie.remove("guest", { path: "/" });
      } else {
        if (
          window.confirm(
            '현재 로그인 상태가 아닙니다. 비로그인 상태로 접속시 임시 데이터가 7일간 저장됩니다. 로그인하시겠습니까?',
          )
        ) {
          navigate(LOGIN);
        } else {
          cookie.save(GUEST_COOKIE, getRandom, {
            path: '/',
            expires,
          });
        }
      }
    }
  }, []);

  return null;
}
