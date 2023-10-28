import Header from '../../component/common/Header';
import CartList from './CartList';
import './Cart.css';
import styled from 'styled-components';
import { useState } from 'react';
const Position = styled.div`
  width: ${(props) => (props.emptyMode ? '80%' : '100%')};

  margin: 0 10%;
`;

export default function Cart() {
  const [emptyMode, setEmptyMode] = useState();
  return (
    <div>
      <Header />
      <Position emptyMode={emptyMode}>
        <CartList setEmptyMode={setEmptyMode} />
      </Position>
    </div>
  );
}
