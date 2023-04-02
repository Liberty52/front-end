import "./MyInfo.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  return (
    <div className="infoBtn">
      <Button text="정보 수정" />
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="infoBtn">
      <Button onClick={confirmDelete} text="회원 탈퇴" />
    </div>
  );
};

const confirmDelete = (memberId) => {
  // const navigate = useNavigate();
  if (window.confirm("정말로 탈퇴하시겠습니까?")) {
    axios
      .delete(`${process.env.REACT_APP_PROXY_URL}/members/${memberId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then(() => {
        localStorage.clear();
        alert("탈퇴가 성공적으로 이루어졌습니다.");
        // navigate("/");
      })
      .catch((err) => alert(err.response.data.message));
  } else {
    alert("취소했습니다.");
  }
};

export default function MyInfo() {
  return (
    <div className="myInfo">
      <UserInfo />
      <DeleteAccount />
    </div>
  );
}
