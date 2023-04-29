import './Input.css';
import { useState, useEffect } from 'react';

export default function Input(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value ? props.value : '');
  }, [props.value]);

  return (
    <div className="input-block">
      <input
        id={props.name}
        className="input"
        type={props.type}
        name={props.name}
        required={props.required}
        pattern={props.pattern}
        maxLength={props.maxLength}
        title={props.title}
        value={value}
        readOnly={props.readOnly}
        onChange={e => {
          setValue(e.target.value);
        }}
        onClick={props.onClick}
        autoComplete="off"
      ></input>
      <label for={props.name} className="label">
        {props.label}
        {props.required ? ' (필수)' : ''}
      </label>
    </div>
  );
}
