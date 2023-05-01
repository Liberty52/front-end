import './SocialLoginButton.css';

export default function SocialLoginButton({ provider }) {
  return (
    <>
      <button className={`social-login-button ${provider.css}`}>
        <a href={provider.url}>
          <img src={provider.img} />
        </a>
      </button>
    </>
  );
}
