import './Logo.css';
import logo from '../image/icon/logo.png';

export default function Logo() {
  return (
    <div className="logo">
      <a href="/">
        <img className="logo-image" src={logo} />
      </a>
    </div>
  );
}
