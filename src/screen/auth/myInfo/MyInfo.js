import './MyInfo.css';
import React from 'react';
import Button from '../../../component/Button';
import del from '../../../axios/auth/MyInfo.js';

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
      <Button onClick={del} text="회원 탈퇴" />
    </div>
  );
};

export default function MyInfo() {
  return (
    <div className="myInfo">
      <UserInfo />
      <DeleteAccount />
    </div>
  );
}
