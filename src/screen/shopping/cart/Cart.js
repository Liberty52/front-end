import React, { useState, useEffect } from "react";
import "./Cart.css";
import Button from "../../../component/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

function CartPage() {
  // const userInfo = CheckLogin();
  const navigate = useNavigate();
  const [data, setCartList] = useState([]);
  useEffect(() => {
    axios.get("http://13.125.49.218:8080/cart").then((response) => {
      setCartList(response.data);
    });
  });
  if (!data) return null;
  if (data.length === 0) {
    alert("장바구니에 담긴 상품이 없습니다.");
    return navigate("/");
  }
  return (
    <div>
      <h2>장바구니</h2>
      <Table bordered hover>
        <tr>
          <th>제품명</th>
          <th>거치방식</th>
          <th>기본소재</th>
          <th>색상</th>
          <th>가격</th>
        </tr>
        {data.length > 0 &&
          data.map((item) => {
            return (
              <tr>
                <th>{item.name}</th>
                <th>{item.holder}</th>
                <th>{item.material}</th>
                <th>{item.color}</th>
                <th>{item.price}</th>
                <th>
                  <button
                    type="button"
                    onClick={(event) => handleDeleteClick(event, item.id)}
                  >
                    삭제
                  </button>
                </th>
              </tr>
            );
          })}
      </Table>
      <Payment></Payment>
    </div>
  );
}

const handleDeleteClick = (itemId) => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    axios.delete(`http://13.125.49.218:8080/itemId`).then(() => {
      window.location.replace("/");
    });
  }
};

function pay() {}

const Payment = () => {
  return (
    <div className="payBtn">
      <Button onClick={pay} text="결제하기" />
    </div>
  );
};

export default function Cart() {
  return (
    <div className="cart">
      <CartPage />
    </div>
  );
}
