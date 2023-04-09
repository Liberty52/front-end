import './InputGroup.css';
import Input from './Input';

export default function InputGroup(props) {
  let inputItems = props.inputItems;
  const list = [];
  inputItems.map((inputItem, i) => {
    list.push(<Input key={i} inputItem={inputItem} />);
  });
  return <div>{list}</div>;
}
