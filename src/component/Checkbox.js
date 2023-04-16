import './Checkbox.css';

export default function Checkbox(props) {
  return (
    <label className="checkbox-wrapper">
      <input className="checkbox" name="checkbox" type="checkbox"></input>
      {props.text}
    </label>
  );
}
