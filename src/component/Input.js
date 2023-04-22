import './Input.css';
import { useState, useEffect } from 'react';

export default function Input(props) {
  const inputItem = props.inputItem;
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(inputItem.value ? inputItem.value : '');
  }, [inputItem.value]);

  return (
    <div className="input-block">
      <input
        id={inputItem.name}
        className="input"
        key={inputItem.name}
        type={inputItem.type}
        name={inputItem.name}
        required={inputItem.required}
        pattern={inputItem.pattern}
        maxLength={inputItem.maxLength}
        title={inputItem.title}
        value={value}
        readOnly={inputItem.readOnly}
        onChange={e => {
          setValue(e.target.value);
        }}
        onClick={inputItem.onClick}
        autoComplete="off"
      ></input>
      <span className="name">
        {inputItem.name}
        <span className="required-mark">{inputItem.required ? '*' : ''}</span>
      </span>
    </div>
  );
}
