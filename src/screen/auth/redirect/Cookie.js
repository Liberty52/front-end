import { useEffect } from "react";
import { useNavigate } from "react-router";
import cookie from "react-cookies";

export default function Cookie() {
  let navigate = useNavigate();
  const getRandom = Math.floor(Math.random() * 1000000) + 1;
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      //   ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    } else {
      if (cookie.load("guest")) {
        console.log(cookie.load("guest"));
        //   cookie.remove("guest", { path: "/" });
      } else {
        if (
          window.confirm(
            "현재 로그인 상태가 아닙니다. 비로그인 상태로 접속시 임시 데이터가 7일간 저장됩니다. 로그인하시겠습니까?"
          )
        ) {
          navigate(`/login`);
        } else {
          cookie.save("guest", getRandom, {
            path: "/",
            expires,
          });
        }
      }
    }
  }, []);

  return null;
}
