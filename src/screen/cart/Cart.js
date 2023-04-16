import React, { useState, useEffect } from "react";
import "./Cart.css";
import LButton from "../../component/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CartPrice.css";
import { Header } from "../Main";
import GetCartList from "../../axios/shopping/Cart";

function TableHeader({ name }) {
  return (
    <div className="cart-header">
      <h1>{name}</h1>
    </div>
  );
}

function CartList() {
  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const onCheckedElement = (checked, item, price) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
      setTotalPrice(totalPrice + price);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
      setTotalPrice(totalPrice - price);
    }
    CartPrice(totalPrice);
  };
  const [data, setCartList] = useState([]);
  useEffect(() => {
    axios
      .get("https://liberty52:444/product/carts", {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
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
  //     id: "01-230412",
  //     name: "Liberty52-Frame",
  //     imageUrl: "",
  //     price: 400000,
  //     quantity: 1,
  //     options: [
  //       {
  //         optionName: "거치방식",
  //         detailName: "벽걸이형",
  //         price: 10000,
  //         require: true,
  //       },
  //       ,
  //       {
  //         optionName: "기본소재",
  //         detailName: "알루미늄",
  //         price: 20000,
  //         require: true,
  //       },
  //       {
  //         optionName: "색상",
  //         detailName: "유광실버",
  //         price: 0,
  //         require: true,
  //       },
  //     ],
  //   },
  //   {
  //     id: "02-230413",
  //     name: "Liberty52-Frame",
  //     imageUrl: "",
  //     price: 300000,
  //     quantity: 2,
  //     options: [
  //       {
  //         optionName: "거치방식",
  //         detailName: "아치형",
  //         price: 10000,
  //         require: true,
  //       },
  //       {
  //         optionName: "기본소재",
  //         detailName: "알루미늄",
  //         price: 20000,
  //         require: true,
  //       },
  //       {
  //         optionName: "색상",
  //         detailName: "무광실버",
  //         price: 0,
  //         require: true,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      <TableHeader name={"장바구니 / Shopping cart"}></TableHeader>
      <Table bordered hover className="cartTable">
        <thead>
          <tr>
            <th width="5%">
              {/* <input
                type="checkbox"
                onClick={(e) => changeAllCheck(e)}
                checked={isCheckAll}
              ></input> */}
            </th>
            <th width="20%">제품명</th>
            <th width="25%">옵션</th>
            <th width="20%">첨부사진</th>
            <th width="10%">수량</th>
            <th width="20%">가격</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item, idx) => {
              return (
                <tr key={idx}>
                  <th>
                    <input
                      type="checkbox"
                      id={item.id}
                      value={item.price}
                      onChange={(e) => {
                        onCheckedElement(
                          e.target.checked,
                          e.target.id,
                          parseFloat(e.target.value)
                        );
                      }}
                    ></input>
                  </th>
                  <th>{item.name}</th>
                  <th>
                    {item.options.map((option) => (
                      <p>
                        {option.optionName} : {option.detailName} (+
                        {addComma(option.price)}원)
                      </p>
                    ))}
                  </th>
                  <th>
                    {item.imageUrl}
                    <button>이미지 시뮬레이터</button>
                  </th>
                  <th>
                    <button
                      className="quantityBtn"
                      onClick={() => {
                        item.quantity += 1;
                        console.log(item.quantity);
                      }}
                    >
                      +
                    </button>
                    <br></br>
                    {item.quantity}
                    <br></br>
                    <button
                      className="quantityBtn"
                      onClick={() => {
                        item.quantity -= 1;
                        console.log(item.quantity);
                      }}
                    >
                      -
                    </button>
                  </th>
                  <th>{addComma(item.price)}원</th>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="btnLayout">
        <Button
          className="UDBtn"
          variant="outline-danger"
          onClick={(e) => handleDeleteClick(checkedList, e)}
        >
          선택상품 삭제
        </Button>
        <Button className="UDBtn" variant="outline-warning">
          수정내용 저장
        </Button>
      </div>
    </div>
  );
}

function CartPrice(cartPrice) {
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
            <p className="price">{JSON.stringify(totalPrice)} 원</p>
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
          <p className="price">{addComma(totalPrice).string} 원</p>
        </div>
      </div>
      <Payment></Payment>
    </div>
  );
}

const addComma = (price) => {
  let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return returnString;
};

const handleDeleteClick = (checkedList) => {
  console.log(checkedList);
  if (checkedList == 0) {
    alert("체크된 항목이 없습니다");
  } else {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(
          `https://liberty52:444/product/carts/custom-products/{customProductId}`,
          {
            headers: {
              Authorization: localStorage.getItem("ACCESS_TOKEN"),
            },
          }
        )
        .then(() => {
          window.location.replace("/");
        });
    }
  }
};

const handleEditClick = (customProductId) => {
  axios
    .patch(
      `https://liberty52:444/product/carts/custom-products/{customProductId}`,
      {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
      }
    )
    .then(() => {
      window.location.replace("/");
    });
};

export default function Cart() {
  return (
    <div>
      <Header />
      <br></br>
      <div className="position">
        <div className="cart-left">
          <CartList />
        </div>
        <div className="cart-right">
          <CartPrice></CartPrice>
        </div>
      </div>
    </div>
  );
}
