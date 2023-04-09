import './SignUp.css';
import post from '../../../axios/auth/SignUp.js';
import InputGroup from '../../../component/InputGroup';
import Button from '../../../component/Button';
import photo from '../../../image/icon/photo.png';
import logo from '../../../image/icon/logo.png';
import { useState } from 'react';

function SignUpForm() {
  return (
    <form
      className="signUp-form"
      onSubmit={event => {
        //event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const phoneNumber = event.target.phoneNumber.value;
        const name = event.target.name.value;
        const recommender = event.target.recommender.value;
        const file = event.target.file.value;
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
      <ImageInput />
      <SignUpInput />
      <Button text="회원가입" />
    </form>
  );
}

function ImageInput() {
  const [imgFile, setImgFile] = useState(photo);
  const reader = new FileReader();
  return (
    <div className="image-input-wrapper">
      <label>
        <input
          className="image-input"
          type="file"
          name="file"
          accept="image/*"
          onChange={event => {
            const file = event.currentTarget.files[0];
            if (file) {
              reader.readAsDataURL(file);
              reader.onloadend = () => {
                setImgFile(reader.result);
                document.querySelector('.image-preview').src = imgFile;
              };
            }
          }}
        ></input>
        <div className="image-crop">
          <img className="image-preview" src={imgFile} alt="프로필 이미지" />
        </div>
      </label>
    </div>
  );
}

function SignUpInput() {
  const signUpItems = [
    { type: 'email', name: 'email', required: true },
    { type: 'password', name: 'password', required: true, maxLength: 25 },
    {
      type: 'text',
      name: 'phoneNumber',
      required: true,
      pattern: '01[0,1][0-9]{6,8}',
      maxLength: 11,
      title: 'ex) 01012341234',
    },
    { type: 'text', name: 'name', required: true, maxLength: 25 },
    { type: 'text', name: 'recommender', required: false, maxLength: 25 },
  ];
  return <InputGroup inputItems={signUpItems} />;
}

function SignUpHeader() {
  return (
    <div className="signUp-header">
      <a href="/">
        <img className="signUp-logo" src={logo} />
      </a>
    </div>
  );
}

export default function SignUp() {
  return (
    <div className="signUp">
      <SignUpHeader />
      <SignUpForm />
    </div>
  );
}
