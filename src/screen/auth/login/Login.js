import React, { useState, useEffect } from 'react';
import './Login.css';
import post from '../../../axios/auth/Login.js';
import {
  findEmail,
  sendPasswordResetEmail,
  getOrderDetails
} from '../../../axios/auth/Login.js';
import Header from '../../../component/Header';
import Checkbox from '../../../component/Checkbox';
import Input from '../../../component/Input';
import Button from '../../../component/Button';
import SocialLoginButton from '../../../component/SocialLoginButton';
import { SOCIAL_LOGIN_PROVIDER } from '../../../global/Constants';
function LoginInput() {
  return (
    <div className="inputs">
      <Input type="email" name="email" label="이메일" required={true} />
      <Input type="password" name="password" label="비밀번호" required={true} />
    </div>
  );
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
  return (
    <div className="inputs">
      <Input type="text" name="name" required={true} label="이름" />
      <Input
        type="tel"
        name="phoneNumber"
        required={true}
        label="휴대전화 번호"
      />
    </div>
  );
}

function PasswordInput() {

  return <Input type="email" name="email" required={true} />;
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
      <div className="social-login-button-group">
        <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.NAVER} />
        <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.KAKAO} />
        <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.GOOGLE} />
        <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.FACEBOOK} />
      </div>
    </div>
  );
}

function Border() {
  return <div className="border"></div>;
}
///////////////////////////////////////////////////////////////

function NonmemberInquiry() {
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
    <div className="Nonmember-Inquiry">
      <button onClick={openModal} className='Nonmember-bt'>비회원 주문 조회</button>
      <NonmemberModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
}
// 모달창
function NonmemberModal({ showModal, closeModal }) {
  if (!showModal) {
    return null;
  }

  const handleMoveInquiry = async (orderId, phoneNumber) => {
    try {
      const orderDetails = await getOrderDetails(orderId, phoneNumber);
      console.log(orderDetails)
      if (orderDetails) {
        window.location.href = `/product/guest/${orderId}?phoneNumber=${phoneNumber}`;
      } else {
        alert('주문번호와 전화번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('서버를 확인해주세요.');
    }
  };


  return (
    <div className={`modal${showModal ? ' is-active' : ''}`}>
      <div className="modal-content">
        <h2>비회원 주문 조회</h2>
        <MoveInquiry onMoveInquiry={handleMoveInquiry} />
        <button className="Nonmember-button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

function MoveInquiry({ onMoveInquiry }) {
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert('전화번호를 입력해 주세요.');
      return;
    }
    onMoveInquiry(orderId, phoneNumber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="orderId">주문번호:</label>
      <input
        type="text"
        id="orderId"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <br />
      <label htmlFor="phoneNumber">전화번호:</label>
      <input
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <br />
      <button type="submit">조회</button>
    </form>
  );
}



export default function Login() {
  return (
    <div className="login">
      <Header />
      <div className="section">
        <CompanyLogin />
        <Border />
        <SocialLogin />
        <Border />
        <NonmemberInquiry />
      </div>
    </div>
  );
}
