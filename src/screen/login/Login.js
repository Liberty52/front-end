import React, { useState, useEffect } from "react";
import "./Login.css";
import post from "../../axios/login/Login.js";
import {
  findEmail,
  sendPasswordResetEmail,
  fetchOrderDetails,
} from "../../axios/login/Login.js";
import Header from "../../component/common/Header";
import Checkbox from "../../component/common/Checkbox";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";
import SocialLoginButton from "../../component/login/SocialLoginButton";
import { SOCIAL_LOGIN_PROVIDER } from "../../global/Constants";

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
      onSubmit={(event) => {
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
  const [emailList, setEmailList] = useState([]);
  const [showEmailListModal, setShowEmailListModal] = useState(false);
  const [showFindFormModal, setShowFindFormModal] = useState(true);

  const handleSetEmailList = (emailList) => {
    setEmailList(emailList || []);
    setShowFindFormModal(false);
    setShowEmailListModal(true);
  };

  const handleCloseFindFormModal = () => {
    setShowFindFormModal(false);
  };

  const handleCloseEmailListModal = () => {
    setEmailList([]);
    setShowEmailListModal(false);
    closeModal();
  };

  useEffect(() => {
    setShowFindFormModal(true);
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <>
      {showFindFormModal && (
        <div className={`modal${showModal ? " is-active" : ""}`}>
          <div className="modal-content">
            <h2>아이디/비밀번호 찾기</h2>
            <FindForm onSetEmailList={handleSetEmailList} />
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
      {showEmailListModal && emailList && (
        <div className={`modal is-active`}>
          <div className="modal-content">
            <h2>아이디 찾기</h2>
            <ul>
              {emailList.map((email, index) => (
                <li key={index}>{maskEmail(email)}</li>
              ))}
            </ul>
            <Button
              onClick={() => (window.location.href = "/login")}
              className="Id-Login"
              text="로그인"
            />
            <button onClick={handleCloseEmailListModal}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}

//////////////////////////////////////////
function FindForm({ onSetEmailList }) {
  const [activeTab, setActiveTab] = useState("id");

  const handleTabClick = (e) => {
    setActiveTab(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (activeTab === "id") {
      const name = event.target.name.value;
      const phoneNumber = event.target.phoneNumber.value;
      console.log("name:", name);
      console.log("phoneNumber:", phoneNumber);
      findEmail(name, phoneNumber)
        .then((response) => {
          const emailList = response.data;
          onSetEmailList(emailList);
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            alert("이메일 찾기 실패");
          }
        });
    } else if (activeTab === "password") {
      const email = event.target.email.value;
      console.log(email);
      try {
        const response = await sendPasswordResetEmail(email);
        console.log("비밀번호 찾기 메일 전송 성공", response);
      } catch (error) {
        console.error("비밀번호 찾기 메일 전송 실패", error.response);
      }
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="tab">
          <label>
            <Input
              type="radio"
              name="tab"
              value="id"
              checked={activeTab === "id"}
              onClick={handleTabClick}
            />{" "}
            아이디
          </label>
          <label>
            <Input
              type="radio"
              name="tab"
              value="password"
              checked={activeTab === "password"}
              onClick={handleTabClick}
            />{" "}
            비밀번호
          </label>
        </div>
        <div className="tab-content" style={{ marginTop: "0.5rem" }}>
          {activeTab === "id" && (
            <div className="tab-pane active">
              <IdInput />
            </div>
          )}
          {activeTab === "password" && (
            <div className="tab-pane active">
              <PasswordInput />
            </div>
          )}
        </div>
        <Button text="확인" />
      </form>
    </>
  );
}

function maskEmail(email) {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart =
    localPart.length > 4
      ? localPart.slice(0, 4) + "*".repeat(localPart.length - 4)
      : localPart;
  return maskedLocalPart + "@" + domain;
}

function IdInput({ setName, setPhoneNumber }) {
  return (
    <div className="inputs">
      <Input
        type="text"
        name="name"
        label="이름"
        required={true}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="tel"
        name="phoneNumber"
        label="전화번호"
        required={true}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  );
}

function PasswordInput({ setEmail }) {
  return (
    <div className="inputs">
      <Input
        type="email"
        name="email"
        label="이메일"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
}

function CompanyLogin() {
  const [showModal, setShowModal] = useState(false);
  const [showFindFormModal, setShowFindFormModal] = useState(true);
  const openModal = () => {
    setShowModal(true);
    setShowFindFormModal(true);
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
///////////// 비회원
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
      <button onClick={openModal} className="Nonmember-bt">
        비회원 주문 조회
      </button>
      <NonmemberModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

function NonmemberModal({ showModal, closeModal }) {
  if (!showModal) {
    return null;
  }

  const handleMoveInquiry = async (orderId, phoneNumber) => {
    try {
      const orderDetails = await fetchOrderDetails(orderId, null, phoneNumber);
      console.log(orderDetails);
      if (orderDetails) {
        window.location.href = `/product/guest/${orderId}?phoneNumber=${phoneNumber}`;
      } else {
        alert("주문번호와 전화번호를 확인해 주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("서버를 확인해주세요.");
    }
  };

  return (
    <div className={`modal${showModal ? " is-active" : ""}`}>
      <div className="modal-content">
        <h2>비회원 주문 조회</h2>
        <MoveInquiry onMoveInquiry={handleMoveInquiry} />
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

function MoveInquiry({ onMoveInquiry }) {
  const [orderId, setOrderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      alert("전화번호를 입력해 주세요.");
      return;
    }
    onMoveInquiry(orderId, phoneNumber);
  };

  const checkValue = (id, value) => {
    if (!value) {
      document.querySelector(`#${id}`).classList.remove("value");
    } else {
      document.querySelector(`#${id}`).classList.add("value");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper" id="orderId">
        <input
          className="input"
          type="text"
          value={orderId}
          onChange={(e) => {
            setOrderId(e.target.value);
            checkValue("orderId", e.target.value);
          }}
        />
        <label htmlFor="orderId" className="label">
          주문번호{true ? " (필수)" : ""}
        </label>
      </div>
      <br />
      <div className="input-wrapper" id="phoneNumber">
        <input
          className="input"
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            checkValue("phoneNumber", e.target.value);
          }}
        />
        <label htmlFor="phoneNumber" className="label">
          전화번호{true ? " (필수)" : ""}
        </label>
      </div>
      <br />
      <Button text="조회" />
    </form>
  );
}
export default function Login() {
  return (
    <div className="login">
      <Header fixed />
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
