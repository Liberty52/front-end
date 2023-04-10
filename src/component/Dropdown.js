import Select from 'react-select';
import { useMemo } from "react";
import "./Dropdown.css"

const Dropdown = ({className, items, title, placeholder}) => {
    const customStyles = useMemo(
        () => ({
          option: (provided, state) => ({
            ...provided,
          }),
          control: (provided) => ({
            ...provided,
            color: "#d3b369",
            border: "1px solid #d3b369",
            margin: "5px 0"
          }),
          singleValue: (provided, state) => ({
            ...provided,
          }),
        }),
        []
      );

    return <div className={className || "basic-select"}>
        <span className="dropdown-span">{title}</span>
        <Select
            classNamePrefix="select"
            isClearable={true}
            options={items}
            placeholder={placeholder}
            styles={customStyles}
        />
    </div>
}


export default Dropdown