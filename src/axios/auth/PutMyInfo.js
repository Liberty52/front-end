import axios from "axios";
import getMyInfo from "./GetMyInfo";

export default function putMyInfo(dto, file, setMyInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  return new Promise((res) => {
    axios
      .put("http://liberty52:444/auth/my", formData, {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
          "Contest-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("회원정보 수정이 완료되었습니다.");
        res(getMyInfo());
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.status === 400)
            alert("기존 비밀번호가 올바르지 않습니다.");
          else if (e.response.status === 401) alert("아이디 오류");
        }
      });
  });
}
