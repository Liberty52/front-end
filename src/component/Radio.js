import './Radio.css';

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
        checked={props.checked}
        onChange={e => {
          props.onChange(e);
          radioButtons.forEach(rb => {
            if (rb === e.target) {
              if (!rb.checked) rb.toggleAttribute('checked');
            } else {
              if (rb.checked) rb.toggleAttribute('checked');
            }
          });
        }}
      />
      <label htmlFor={'radio ' + props.text}>{props.text}</label>
    </div>
  );
}
