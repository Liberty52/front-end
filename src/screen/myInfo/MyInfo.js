import "./MyInfo.css";
import React from "react";
import Button from "../../component/common/Button";
import Image from "../../component/common/Image";
import ImageInput from "../../component/common/ImageInput";
import Input from "../../component/common/Input";
import { delMyInfo, putMyInfo, getMyInfo } from "../../axios/myInfo/MyInfo";
import Header from "../../component/common/Header";
import { useState, useEffect } from "react";

function UpdateInfo(props) {
  const myInfo = props.myInfo;

  return (
    <>
      <tr>
        <td>
          <Input
            type="text"
            name="name"
            label="이름"
            required={true}
            maxLength={25}
            value={myInfo === undefined ? "" : myInfo.name}
          />
        </td>
      </tr>
      <tr>
        <td>
          <Input
            type="text"
            name="phoneNumber"
            label="휴대폰번호"
            required={true}
            pattern="01[0,1][0-9]{6,8}"
            maxLength={11}
            title="ex) 01012341234"
            value={myInfo === undefined ? "" : myInfo.phoneNumber}
          />
        </td>
      </tr>
      <tr>
        <td>
          <Input
            type="password"
            name="originPassword"
            label="현재 비밀번호"
            required={true}
          />
        </td>
      </tr>
      <tr>
        <td>
          <Input type="password" name="updatePassword" label="변경 비밀번호" />
        </td>
      </tr>
      <tr>
        <td>
          <Input type="password" name="confirm" label="비밀번호 확인" />
        </td>
      </tr>
    </>
  );
}

function CurrentInfo(props) {
  const myInfo = props.myInfo;
  return (
    <>
      <tr>
        <th>이름</th>
        <td>
          <span className="info-value">
            {myInfo === undefined ? "" : myInfo.name}
          </span>
        </td>
      </tr>
      <tr>
        <th>이메일</th>
        <td>
          <span className="info-value">
            {myInfo === undefined ? "" : myInfo.email}
          </span>
        </td>
      </tr>
      <tr>
        <th>휴대폰번호</th>
        <td>
          <span className="info-value">
            {myInfo === undefined ? "" : myInfo.phoneNumber}
          </span>
        </td>
      </tr>
    </>
  );
}

function InfoGroup(props) {
  const updateMode = props.updateMode;
  const myInfo = props.myInfo;
  const image = myInfo === undefined ? "" : myInfo.profileUrl;

  return (
    <div className="myInfo-info-group">
      <div className="myInfo-image-wrapper">
        {updateMode ? <ImageInput image={image} /> : <Image image={image} />}
      </div>
      <table className="myInfo-table">
        <tbody>
          {updateMode ? (
            <UpdateInfo myInfo={props.myInfo} />
          ) : (
            <CurrentInfo myInfo={props.myInfo} />
          )}
        </tbody>
      </table>
    </div>
  );
}

function ButtonGroup(props) {
  return props.updateMode ? (
    <div className="myInfo-button-group">
      <Button text="수정" />
      <Button text="취소" onClick={props.cancelUpdateMode} />
    </div>
  ) : (
    <div className="myInfo-button-group">
      <Button text="정보 수정" onClick={props.setUpdateMode} />
      <Button text="회원 탈퇴" onClick={delMyInfo} />
    </div>
  );
}

function MyInfoForm() {
  useEffect(() => {
    getMyInfo().then((res) => {
      setMyInfo(res);
    });
  }, []);

  const [myInfo, setMyInfo] = useState();
  const [updateMode, setUpdateMode] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!updateMode) return;
        const name = event.target.name.value;
        const originPassword = event.target.originPassword.value;
        const updatePassword = event.target.updatePassword.value;
        const confirm = event.target.confirm.value;
        const phoneNumber = event.target.phoneNumber.value;
        const file = event.target.file.files[0];
        const dto = {
          name: name,
          originPassword: originPassword,
          updatePassword: updatePassword,
          phoneNumber: phoneNumber,
        };
        if (confirm === updatePassword) {
          putMyInfo(dto, file).then((res) => setMyInfo(res));
          setUpdateMode(false);
        } else alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      }}
      className="myInfo-input-group"
    >
      <InfoGroup updateMode={updateMode} myInfo={myInfo} />
      <ButtonGroup
        updateMode={updateMode}
        setUpdateMode={() => {
          setUpdateMode(true);
        }}
        cancelUpdateMode={() => {
          setUpdateMode(false);
        }}
      />
    </form>
  );
}

function Section() {
  return (
    <div className="section">
      <MyInfoForm />
    </div>
  );
}

export default function MyInfo() {
  return (
    <div className="myInfo">
      <Header fixed />
      <Section />
    </div>
  );
}
