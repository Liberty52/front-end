import './Button.css';

export default function Button(props) {
  return (
    <button
      type={props.type ? props.type : 'submit'}
      className="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.href ? <a href={props.href}>{props.text}</a> : <>{props.text}</>}
    </button>
  );
}
