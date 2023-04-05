import './Button.css';

export default function Button(props) {
  if (props.href) {
    return (
      <button className={'button'} onClick={props.onClick}>
        <a href={props.href}>{props.text}</a>
      </button>
    );
  } else {
    return (
      <button className="button" onClick={props.onClick}>
        {props.text}
      </button>
    );
  }
}
