import './Radio.css';
import { useState, useEffect } from 'react';

export default function Radio(props) {
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name=' + props.name + ']'
  );

  return (
    <div className="radio" style={props.style}>
      <input
        id={'radio ' + props.text}
        type="radio"
        name={props.name}
        value={props.text}
        required={props.required}
        onChange={e => {
          props.onChange(e);
          radioButtons.forEach(rb => {
            if (rb !== e.target) {
              rb.toggleAttribute('checked');
            }
          });
          e.target.toggleAttribute('checked');
        }}
      />
      <label htmlFor={'radio ' + props.text}>{props.text}</label>
    </div>
  );
}
