import './SocialLoginButton.css';

export default function SocialLoginButton({ provider, target }) {
  return (
    <>
      <button className={`social-login-button ${provider.css}`}>
        <a href={provider.url} target={target ?? '_self'}>
          <img src={provider.img} />
        </a>
      </button>
    </>
  );
}
