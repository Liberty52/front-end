import './MyInfo.css';
import React from 'react';
import Button from '../../../component/Button';
import Image from '../../../component/Image';
import ImageInput from '../../../component/ImageInput';
import Input from '../../../component/Input';
import del from '../../../axios/auth/MyInfo.js';
import putMyInfo from '../../../axios/auth/PutMyInfo';
import getMyInfo from '../../../axios/auth/GetMyInfo';
import Logo from '../../../component/Logo';
import { useState, useEffect } from 'react';

function InfoGroup(props) {
  const updateMode = props.updateMode;
  const inputItems = props.inputItems;
  const infoItems = props.infoItems;

  let returnValue = [];
  if (updateMode) {
    inputItems.map(inputItem => {
      returnValue.push(
        <tr key={inputItem.name}>
          <td>
            {inputItem.name === 'email' ? (
              <span>{inputItem.value}</span>
            ) : (
              <Input inputItem={inputItem}></Input>
            )}
          </td>
        </tr>
      );
    });
  } else {
    infoItems.map(infoItem => {
      returnValue.push(
        <tr key={infoItem.name}>
          <th>{infoItem.name}</th>
          <td>
            <span>{infoItem.value}</span>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="myInfo-info-group">
      <div className="myInfo-image-wrapper">
        {updateMode ? <ImageInput image={props.image} /> : <Image />}
      </div>
      <table className="myInfo-table">
        <tbody>{returnValue}</tbody>
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
      <Button text="회원 탈퇴" onClick={del} />
    </div>
  );
}

function MyInfoForm(props) {
  const setMyInfo = props.setMyInfo;
  const [updateMode, setUpdateMode] = useState(false);
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!updateMode) return;
        const name = event.target.name.value;
        const originPassword = event.target.originPassword.value;
        const updatePassword = event.target.updatePassword.value;
        const confirm = event.target.confirm.value;
        const phoneNumber = event.target.phoneNumber.value;
        const file = event.target.file.value;
        const dto = {
          name: name,
          originPassword: originPassword,
          updatePassword: updatePassword,
          phoneNumber: phoneNumber,
        };
        if (confirm === updatePassword) {
          putMyInfo(dto, file).then(res => setMyInfo(res));
          setUpdateMode(false);
        } else alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      }}
      className="myInfo-input-group"
    >
      <InfoGroup
        updateMode={updateMode}
        inputItems={props.inputItems}
        infoItems={props.infoItems}
        image={props.image}
      />
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

export default function MyInfo() {
  useEffect(() => {
    getMyInfo().then(res => setMyInfo(res));
  }, []);

  const [myInfo, setMyInfo] = useState();
  const infoItems = [
    {
      name: 'name',
      value: myInfo === undefined ? '' : myInfo.name,
    },
    {
      name: 'email',
      value: myInfo === undefined ? '' : myInfo.email,
    },
    {
      name: 'phoneNumber',
      value: myInfo === undefined ? '' : myInfo.phoneNumber,
    },
  ];
  const inputItems = [
    {
      type: 'text',
      name: 'name',
      required: true,
      maxLength: 25,
      value: myInfo === undefined ? '' : myInfo.name,
    },
    {
      type: 'text',
      name: 'phoneNumber',
      required: true,
      pattern: '01[0,1][0-9]{6,8}',
      maxLength: 11,
      title: 'ex) 01012341234',
      value: myInfo === undefined ? '' : myInfo.phoneNumber,
    },
    {
      type: 'password',
      name: 'originPassword',
      required: true,
    },
    {
      type: 'password',
      name: 'updatePassword',
    },
    {
      type: 'password',
      name: 'confirm',
    },
  ];
  return (
    <div className="myInfo">
      <Logo />
      <MyInfoForm
        image={myInfo === undefined ? '' : myInfo.profileUrl}
        inputItems={inputItems}
        infoItems={infoItems}
        setMyInfo={setMyInfo}
      />
    </div>
  );
}
