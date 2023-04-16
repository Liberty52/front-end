import { useState } from "react";
import Select from "react-select";

const options = [
  {
    optionName: "거치방식",
    detailName: "벽걸이형",
    price: 10000,
    require: true,
  },
  {
    optionName: "거치방식",
    detailName: "벽걸이형",
    price: 10000,
    require: true,
  },
  ,
  {
    optionName: "기본소재",
    detailName: "알루미늄",
    price: 20000,
    require: true,
  },
  {
    optionName: "색상",
    detailName: "유광실버",
    price: 0,
    require: true,
  },
  {
    optionName: "색상",
    detailName: "유광실버",
    price: 0,
    require: true,
  },
  {
    optionName: "색상",
    detailName: "유광실버",
    price: 0,
    require: true,
  },
  {
    optionName: "색상",
    detailName: "유광실버",
    price: 0,
    require: true,
  },
];

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

export default function Purchase() {
  return SelectBox;
}
