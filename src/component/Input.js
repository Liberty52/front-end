import './Input.css';
import { useState } from 'react';

export default function Input(props) {
  const inputItem = props.inputItem;
  const [value, setValue] = useState('');
  setValue(inputItem.value);
  return (
    <div className="input-block">
      <input
        className="input"
        key={inputItem.name}
        type={inputItem.type}
        name={inputItem.name}
        required={inputItem.required}
        pattern={inputItem.pattern}
        maxLength={inputItem.maxLength}
        title={inputItem.title}
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        autoComplete="off"
      ></input>
      <span className="name">
        {inputItem.name}
        <span className="required-mark">{inputItem.required ? '*' : ''}</span>
      </span>
    </div>
  );
}
