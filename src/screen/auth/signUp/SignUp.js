import './SignUp.css';
import post from '../../../axios/auth/SignUp.js';
import InputGroup from '../../../component/InputGroup';
import ImageInput from '../../../component/ImageInput';
import Button from '../../../component/Button';
import Logo from '../../../component/Logo';

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
      <div className="signUp-image-wrapper">
        <ImageInput />
      </div>
      <SignUpInput />
      <Button text="회원가입" />
    </form>
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

export default function SignUp() {
  return (
    <div className="signUp">
      <Logo />
      <SignUpForm />
    </div>
  );
}
