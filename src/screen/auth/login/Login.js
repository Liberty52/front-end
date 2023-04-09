import './Login.css';
import post from '../../../axios/auth/Login.js';
import Checkbox from '../../../component/Checkbox';
import InputGroup from '../../../component/InputGroup';
import Button from '../../../component/Button';
import logo from '../../../image/icon/logo.png';
import SocialLoginButton from "../../../component/SocialLoginButton";
import {SOCIAL_LOGIN_PROVIDER} from "../../../global/Constants";

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
      <Checkbox className="login-checkbox" text="로그인 상태 유지" />
      <Button text="로그인" />
    </form>
  );
}

function CompanyLogin() {
  return (
    <div className="company-login">
      <LoginForm />
      <div className="login-nav">
        <a href="/signUp">회원가입</a>
        <a href="/find">아이디/비밀번호 찾기</a>
      </div>
    </div>
  );
}

function SocialLogin() {
  return (
    <div className="social-login">
      <div className="login-title">소셜 로그인</div>
      <div>
          <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.NAVER}/>
          <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.KAKAO}/>
          <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.GOOGLE}/>
          <SocialLoginButton provider={SOCIAL_LOGIN_PROVIDER.FACEBOOK}/>
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
