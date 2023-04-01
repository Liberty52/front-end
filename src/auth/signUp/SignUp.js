import './SignUp.css';
import InputGroup from '../../common/InputGroup';
import Button from '../../common/Button';
import photo from '../../image/icon/photo.png';
import logo from '../../image/icon/logo.png';
import { useState } from 'react';
import axios from 'axios';

function post(dto, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'dto',
    new Blob([JSON.stringify(dto)], { type: 'application/json' })
  );
  axios
    .post('http://localhost:8080/auth/sign-up', formData, {
      headers: {
        'Contest-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      alert(dto.name + '님 회원 가입을 환영합니다.');
      // window.location.replace('/login')
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === 500) {
          alert(dto.email + '은 사용할 수 없는 이메일입니다.');
        }
      }
    });
}

function SignUpForm() {
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
