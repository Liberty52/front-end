import './Input.css';
import { useState, useEffect } from 'react';

export default function Input(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value ? props.value : '');
  }, [props.value]);

  useEffect(() => {
    if (!value)
      document.querySelector('#' + props.name).classList.remove('value');
    else document.querySelector('#' + props.name).classList.add('value');
  }, [value]);

  return (
    <div id={props.name} className="input-block">
      <input
        className="input"
        type={props.type}
        name={props.name}
        required={props.required}
        pattern={props.pattern}
        maxLength={props.maxLength}
        title={props.title}
        value={value}
        readOnly={props.readOnly}
        checked={props.checked}
        onChange={e => {
          setValue(e.target.value);
        }}
        onClick={props.onClick}
        autoComplete="off"
      />
      <label htmlFor={props.name} className="label">
        {props.label}
        {props.required ? ' (필수)' : ''}
      </label>
    </div>
  );
}
