import React, { useState, useEffect } from "react";
import "./Cart.css";
import LButton from "../../../component/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CartPrice.css";

function MypageHeader({ name }) {
  return (
    <div className="cart-header">
      <h1>{name}</h1>
    </div>
  );
}

function CartPage() {
  // const userInfo = CheckLogin();
  const navigate = useNavigate();
  const [data, setCartList] = useState([]);
  useEffect(() => {
    axios.get("https://liberty52:444/product/cart-items").then((response) => {
      setCartList(response.data);
    });
  });
  if (!data) return null;
  if (data.length === 0) {
    alert("장바구니에 담긴 상품이 없습니다.");
    return navigate("/");
  }
  // const data = [
  //   {
  //     name: "Liberty52-Frame",
  //     holder: "벽걸이",
  //     material: "알루미늄",
  //     color: "유광실버",
  //     price: "50000",
  //     amount: "1",
  //   },
  //   {
  //     name: "Liberty52-Frame",
  //     holder: "아치형",
  //     material: "알루미늄",
  //     color: "무광실버",
  //     price: "40000",
  //     amount: "2",
  //   },
  // ];
  return (
    <div>
      <MypageHeader name={"장바구니"}></MypageHeader>
      <Table bordered hover className="cartTable">
        <tr>
          <th width="20%">제품명</th>
          <th width="20%">거치방식</th>
          <th width="20%">기본소재</th>
          <th width="15%">색상</th>
          <th width="15%">가격</th>
          <th width="5%">수량</th>
          <th width="5%"></th>
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
                <th>{item.amount}</th>
                <th>
                  <Button
                    variant="outline-danger"
                    className="delBtn"
                    type="button"
                    onClick={(event) => handleDeleteClick(event, item.id)}
                  >
                    X
                  </Button>
                </th>
              </tr>
            );
          })}
      </Table>
    </div>
  );
}

function CartPrice() {
  let totalPrice = 0;

  return (
    <div className="cartprice">
      <div className="calcwrap">
        <div className="orderprice">
          <p className="title">총 주문 금액</p>
          <p className="price">
            {/* {totalPrice > 0 ? formatPrice(totalPrice) : 0} 원 */}
          </p>
        </div>
        <div className="discount">
          <p className="title">할인 금액</p>
          <p className="price">0 원</p>
        </div>
        <div className="shipping">
          <p className="title">배송비</p>
          <p className="price">0 원</p>
        </div>
      </div>
      <div className="total">
        <p className="title">총 결제 금액</p>
        <p className="price">
          {/* {totalPrice > 0 ? formatPrice(totalPrice) : 0}원 */}
        </p>
      </div>
    </div>
  );
}

const handleDeleteClick = (itemId) => {
  if (window.confirm("정말로 삭제하시겠습니까?")) {
    axios
      .delete(`https://liberty52:444/product/cart-items/cartItemId`, {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then(() => {
        window.location.replace("/");
      });
  }
};

function pay() {}

const Payment = () => {
  return (
    <div className="payBtn">
      <LButton onClick={pay} text="결제하기" />
    </div>
  );
};

export default function Cart() {
  return (
    <div className="position">
      <div className="cart-left">
        <CartPage />
      </div>
      <div className="cart-right">
        <CartPrice></CartPrice>
        <Payment></Payment>
      </div>
    </div>
  );
}
