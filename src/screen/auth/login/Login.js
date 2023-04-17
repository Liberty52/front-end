import React, { useState, useEffect } from 'react';
import './Login.css';
import post from '../../../axios/auth/Login.js';
import {
  findEmail,
  sendPasswordResetEmail,
} from '../../../axios/auth/Login.js';
import Checkbox from '../../../component/Checkbox';
import InputGroup from '../../../component/InputGroup';
import Button from '../../../component/Button';
import logo from '../../../image/icon/logo.png';
function LoginInput() {
  const loginItems = [
    { type: 'email', name: 'email', required: true },
    { type: 'password', name: 'password', required: true },
  ];

  return <InputGroup inputItems={loginItems} />;
}

function LoginForm() {
  return (
    <form
      className="login-form"
      onSubmit={event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const checked = event.target.checkbox.checked;
        const dto = {
          email: email,
          password: password,
        };
        post(dto, checked);
      }}
    >
      <div className="login-title">로그인</div>
      <LoginInput />
      <Checkbox text="로그인 상태 유지" />
      <Button text="로그인" />
    </form>
  );
}

function PasswordRecoveryModal({ showModal, closeModal }) {
  if (!showModal) {
    return null;
  }

  return (
    <div className={`modal${showModal ? ' is-active' : ''}`}>
      <div className="modal-content">
        <h2>아이디/비밀번호 찾기</h2>
        <FindForm />
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

function FindForm() {
  const [activeTab, setActiveTab] = useState('id');

  const handleTabClick = e => {
    setActiveTab(e.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (activeTab === 'id') {
      const name = event.target.name.value;
      const phoneNumber = event.target.phoneNumber.value;
      findEmail(name, phoneNumber)
        .then(response => {
          const email = response.data.email;
          const maskedEmail = email.slice(0, 4) + '*'.repeat(email.length - 4);
          alert('이메일 찾기 성공: ' + maskedEmail);
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            alert('이메일 찾기 실패');
          }
        });
    } else if (activeTab === 'password') {
      const email = event.target.email.value;
      console.log(email);
      try {
        const response = await sendPasswordResetEmail(email);
        // 비밀번호 찾기 성공 시 처리
        console.log('비밀번호 찾기 메일 전송 성공', response);
      } catch (error) {
        // 비밀번호 찾기 실패 시 처리
        console.error('비밀번호 찾기 메일 전송 실패', error.response);
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="tab">
        <label>
          <input
            type="radio"
            name="tab"
            value="id"
            defaultChecked
            onClick={handleTabClick}
          />{' '}
          아이디
        </label>
        <label>
          <input
            type="radio"
            name="tab"
            value="password"
            onClick={handleTabClick}
          />{' '}
          비밀번호
        </label>
      </div>
      <div className="tab-content" style={{ marginTop: '0.5rem' }}>
        {activeTab === 'id' && (
          <div className="tab-pane active">
            <IdInput />
          </div>
        )}
        {activeTab === 'password' && (
          <div className="tab-pane active">
            <PasswordInput />
          </div>
        )}
      </div>
      <Button text="확인" />
    </form>
  );
}

function IdInput() {
  const loginItems = [
    { type: 'text', name: 'name', required: true, label: '이름' },
    {
      type: 'tel',
      name: 'phoneNumber',
      required: true,
      label: '휴대전화 번호',
    },
  ];
  return <InputGroup inputItems={loginItems} />;
}

function PasswordInput() {
  const loginItems = [{ type: 'email', name: 'email', required: true }];
  return <InputGroup inputItems={loginItems} />;
}

function CompanyLogin() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="company-login">
      <LoginForm />
      <div className="login-nav">
        <a href="/signUp">회원가입</a>
        <button onClick={openModal}>아이디/비밀번호 찾기</button>
        <PasswordRecoveryModal showModal={showModal} closeModal={closeModal} />
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="social-login">
      <div className="login-title">소셜 로그인</div>
      <div>
        <Button
          href={'http://13.125.49.218:8080/auth/oauth2/authorization/naver'}
          text="네이버 로그인 버튼"
        />
        <Button href={'#'} text="카카오 로그인 버튼 (임시)" />
        <Button href={'#'} text="페이스북 로그인 버튼 (임시)" />
      </div>
    </div>
  );
}

function Border() {
  return <div className="border"></div>;
}

function LoginHeader() {
  return (
    <div className="login-header">
      <a href="/">
        <img className="login-logo" src={logo} />
      </a>
    </div>
  );
}

export default function Login() {
  return (
    <div className="login">
      <LoginHeader />
      <CompanyLogin />
      <Border />
      <SocialLogin />
    </div>
  );
}
