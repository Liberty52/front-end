import post from "../../../axios/shopping/Purchase.js";
import Button from "../../../component/Button";
import "./Purchase.css";
import { useState } from "react";
import Select from "react-select";

function PurchaseForm() {
  const productId = "10101";
  const ea = "1";
  const [inputValues, setInputValues] = useState({
    a: "",
    b: "",
    c: "",
  });
  console.log(inputValues);

  const onSubmit = (e) => {
    e.preventDefault();
    const holder = e.target.holder.value;
    const material = e.target.material.value;
    const color = e.target.color.value;
    const list = [holder, material, color];
    const dto = {
      productId: productId,
      ea: ea,
      optionRequestList: list,
    };
    console.log(dto);
    post(dto);
  };

  return (
    <form onSubmit={onSubmit}>
      <SelectBox name="holder" options={holder}></SelectBox>
      <SelectBox name="material" options={material}></SelectBox>
      <SelectBox name="color" options={color}></SelectBox>
      <Button type="submit" text="장바구니 담기" />
    </form>
  );
}

const SelectBox = (props) => {
  const [selectValue, setSelectValue] = useState(props.initValue);
  console.log(selectValue);
  return (
    <select
      name={props.name}
      value={selectValue}
      className="select"
      onChange={(e) => {
        setSelectValue(e.target.value);
      }}
    >
      {props.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

const holder = [
  { value: "nothing", name: "-선택하세요-" },
  { value: "a1", name: "이젤 거치형" },
  { value: "a2", name: "벽걸이형" },
];

const color = [
  { value: "nothing", name: "-선택하세요-" },
  { value: "c1", name: "유광실버" },
  { value: "c2", name: "무광실버" },
  { value: "c3", name: "유광백색" },
  { value: "c4", name: "무광백색" },
];

const material = [
  { value: "nothing", name: "-선택하세요-" },
  { value: "b1", name: "1mm 알루미늄시트" },
];

export default function Purchase() {
  return (
    <div className="detail">
      <PurchaseForm />
    </div>
  );
}
