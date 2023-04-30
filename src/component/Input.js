import "./Input.css";
import { useState, useEffect } from "react";

export default function Input(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.value ? props.value : "");
  }, [props.value]);

  useEffect(() => {
    if (!value)
      document.querySelector("#" + props.name).classList.remove("value");
    else document.querySelector("#" + props.name).classList.add("value");
  }, [value]);

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
<<<<<<< HEAD
        onChange={(e) => {
          if (!props.readOnly) setValue(e.target.value);
=======
        onChange={e => {
          setValue(e.target.value);
>>>>>>> ec83c28eba73da88312d677346a6dbf0a0d1b95b
        }}
        onClick={props.onClick}
        autoComplete="off"
      ></input>
      <label for={props.name} className="label">
        {props.label}
        {props.required ? " (필수)" : ""}
      </label>
    </div>
  );
}
