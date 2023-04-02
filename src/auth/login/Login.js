import './Login.css';
import post from '../../axios/auth/Login.js';
import Checkbox from '../../common/Checkbox';
import InputGroup from '../../common/InputGroup';
import Button from '../../common/Button';
import logo from '../../image/icon/logo.png';

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
        // const checked = event.target.checkbox.checked;
        const dto = {
          email: email,
          password: password,
        };
        post(dto);
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
        <Button text="네이버 로그인 버튼 (임시)" />
        <Button text="카카오 로그인 버튼 (임시)" />
        <Button text="페이스북 로그인 버튼 (임시)" />
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
