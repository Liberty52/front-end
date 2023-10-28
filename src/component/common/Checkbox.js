import './Checkbox.css';

export default function Checkbox(props) {
  return (
    <div className='checkbox-wrapper'>
      <input
        id={props.name ? props.name : 'checkbox'}
        className='checkbox'
        name={props.name ? props.name : 'checkbox'}
        type='checkbox'
        onChange={props.onChange}
        checked={props.checked}
      ></input>
      <span>
        {props.independentText1}
        <label htmlFor={props.name ? props.name : 'checkbox'}>{props.text}</label>
      </span>
    </div>
  );
}
