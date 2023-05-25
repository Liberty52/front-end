import './SignUp.css';
import post from '../../../axios/login/SignUp.js';
import Input from '../../../component/common/Input';
import ImageInput from '../../../component/common/ImageInput';
import Button from '../../../component/common/Button';
import Header from '../../../component/common/Header';

function Section() {
  return (
    <div className="section">
      <Form />
    </div>
  );
}

function Form() {
  return (
    <form
      className="signUp-form"
      onSubmit={event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const phoneNumber = event.target.phoneNumber.value;
        const name = event.target.name.value;
        const recommender = event.target.recommender.value;
        const file = event.target.file.files[0];
        const dto = {
          email: email,
          password: password,
          phoneNumber: phoneNumber,
          name: name,
          recommender: recommender,
        };
        post(dto, file);
      }}
    >
      <div className="signUp-title">회원가입</div>
      <div className="signUp-image-wrapper">
        <ImageInput />
      </div>
      <SignUpInput />
      <Button text="회원가입" />
    </form>
  );
}

function SignUpInput() {
  return (
    <div className="inputs">
      <Input type="email" name="email" label="이메일" required={true} />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        required={true}
        maxLength={25}
      />
      <Input
        type="text"
        name="phoneNumber"
        label="휴대폰번호"
        required={true}
        pattern="01[0,1][0-9]{6,8}"
        maxLength={11}
        title="ex) 01012341234"
      />
      <Input
        type="text"
        name="name"
        label="이름"
        required={true}
        maxLength={25}
      />
      <Input
        type="text"
        name="recommender"
        label="추천인"
        required={false}
        maxLength={25}
      />
    </div>
  );
}

export default function SignUp() {
  return (
    <div className="signUp">
      <Header />
      <Section />
    </div>
  );
}
