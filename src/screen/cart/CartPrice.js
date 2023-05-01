import React, { useState, useEffect } from "react";
import LButton from "../../component/Button";
import { addComma } from "./Comma";
import "./CartPrice.css";

export default function CartPrice(cartPrice) {
  // const [totalPrice, setTotalPrice] = useState(0.0);
  // useEffect(() => {
  //   setTotalPrice(cartPrice);
  // }, []);
  var totalPrice = cartPrice;
  console.log(totalPrice, typeof totalPrice);

  function pay() {}

  const Payment = () => {
    return (
      <div className="payBtn">
        <LButton onClick={pay} text="선택 상품 주문" />
      </div>
    );
  };

  return (
    <div>
      <div className="cartprice">
        <div className="calcwrap">
          <div className="orderprice">
            <p className="title">총 주문 금액</p>
            <p className="price">{} 원</p>
          </div>
          <div className="discount">
            <p className="title">적립금</p>
            <p className="price">0 원</p>
          </div>
          <div className="shipping">
            <p className="title">배송비</p>
            <p className="price">0 원</p>
          </div>
        </div>
        <div className="total">
          <p className="title">총 결제 금액</p>
          {/* <p className="price">{addComma(totalPrice).string} 원</p> */}
        </div>
      </div>
      <Payment></Payment>
    </div>
  );
}
