import './ImageButton.css';

export default function ImageButton(props) {
  return (
    <button
      type={props.type ? props.type : 'submit'}
      className="image-button"
      onClick={props.onClick}
    >
      {props.href ? (
        <a href={props.href}>
          <img src={props.image}></img>
        </a>
      ) : (
        <img src={props.image}></img>
      )}
    </button>
  );
}
