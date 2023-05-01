import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartPrice from "./CartPrice";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  GetCartList,
  handleDeleteClick,
  handleEditClick,
} from "../../axios/shopping/Cart";
import { addComma } from "./Comma";
import cookie from "react-cookies";
import { mockData } from "./MockData";

export default function CartList() {
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [formValue, setFormValue] = useState({
    holder: "",
    material: "",
    color: "",
    quantity: "",
  });
  const [hidden, setHidden] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  let [imageFile, setImageFile] = useState("");
  let [disabledBtn, setDisabledBtn] = useState(true);
  let [customProductId, setCustomProductId] = useState("");
  let editData = "";
  let basicFormValue = {
    holder: "",
    material: "",
    color: "",
    quantity: 1,
  };
  const selectList = {
    holder: ["거치 방식을 선택해주세요.", "이젤 거치형", "벽걸이형"],
    material: [
      "기본 소재를 선택해주세요.",
      "1mm 두께 승화전사 인쇄용 알루미늄시트",
    ],
    color: [
      "색상을 선택해주세요.",
      "유광실버",
      "무광실버",
      "유광백색",
      "무광백색",
    ],
  };
  const onImageChange = (e) => {
    const img = e.target.files[0];
    setImageFile(img);
    console.log(imageFile);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const rawData = [
      formValue.holder,
      "1mm 두께 승화전사 인쇄용 알루미늄시트",
      formValue.color,
    ].filter(Boolean);
    const data = {
      options: rawData,
      quantity: Number(formValue.quantity),
    };
    editData = data;
  };
  const handleRowClick = (id, idx, options, quantity) => {
    console.log(formValue);
    let newHidden = [...hidden];
    if (newHidden.indexOf(false) == idx) {
      //수정옵션 열려있을 때
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(true);
    } else {
      newHidden[newHidden.indexOf(false)] = true;
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(false);
      basicFormValue = {
        holder: options[0].detailName,
        material: options[1].detailName,
        color: options[2].detailName,
        quantity: quantity,
      };
    }
    setCustomProductId(id);
    setFormValue(basicFormValue);
  };
  const onHandleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
    console.log(formValue);
  };
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
    if (localStorage.getItem("ACCESS_TOKEN")) {
      axios
        .get("https://liberty52.com:444/product/carts", {
          headers: {
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        })
        .then((response) => {
          setCartList(response.data);
          if (!response.data || response.data == "") {
            // alert("장바구니에 담긴 상품이 없습니다.");
            // return navigate("/");
          }
        });
    } else if (cookie.load("guest")) {
      axios
        .get("https://liberty52.com:444/product/guest/carts", {
          headers: {
            Authorization: cookie.load("guest"),
          },
        })
        .then((response) => {
          setCartList(response.data);
          if (!response.data || response.data == "") {
            // alert("장바구니에 담긴 상품이 없습니다.");
            // return navigate("/");
          }
        });
    } else {
      alert("잘못된 접근입니다");
      return navigate("/");
    }
  }, []);
  // const data = mockData;
  if (!data || data == "") {
    return (
      <div id="cartTable">
        <div className="cart-header">
          <h1>장바구니 / Shopping cart</h1>
        </div>
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
              <th width="15%">제품명</th>
              <th width="15%">제품가격</th>
              <th width="25%">옵션</th>
              <th width="15%">첨부사진</th>
              <th width="10%">수량</th>
              <th width="15%">주문금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan="7">
                <h1>장바구니에 담긴 상품이 없습니다</h1>
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div id="cartTable">
        <div className="cart-header">
          <h1>장바구니 / Shopping cart</h1>
        </div>
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
              <th width="15%">제품명</th>
              <th width="15%">제품가격</th>
              <th width="25%">옵션</th>
              <th width="15%">첨부사진</th>
              <th width="10%">수량</th>
              <th width="15%">주문금액</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item, idx) => {
                let orderAmount = 0.0;
                orderAmount =
                  (item.price +
                    item.options[0].price +
                    item.options[1].price +
                    item.options[2].price) *
                  item.quantity;
                return (
                  <>
                    <tr
                      key={idx}
                      onClick={() =>
                        handleRowClick(
                          item.id,
                          idx,
                          item.options,
                          item.quantity
                        )
                      }
                    >
                      <th>
                        <input
                          type="checkbox"
                          id={item.id}
                          value={orderAmount}
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
                      <th>{addComma(item.price)}원</th>
                      <th>
                        {item.options.map((option) => (
                          <p>
                            {option.optionName} : {option.detailName} (+
                            {addComma(option.price)}원)
                          </p>
                        ))}
                      </th>
                      <th>
                        <button
                          onClick={() => window.open(item.imageUrl, "_blank")}
                        >
                          [이미지 링크]
                        </button>
                      </th>
                      <th>{item.quantity}</th>
                      <th>{addComma(orderAmount)}원</th>
                    </tr>
                    <tr
                      style={
                        hidden[idx] ? { display: "none" } : { display: "" }
                      }
                    >
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>
                        <select
                          onChange={onHandleChange}
                          value={formValue.holder}
                          name="holder"
                        >
                          {selectList.holder.map((item, idx) => {
                            if (idx == 0) {
                              return (
                                <option value={item} key={item} disabled>
                                  {item}
                                </option>
                              );
                            } else {
                              return (
                                <option value={item} key={item}>
                                  {item}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <select
                          onChange={onHandleChange}
                          value={formValue.material}
                          name="material"
                        >
                          {selectList.material.map((item, idx) => {
                            if (idx == 0) {
                              return (
                                <option value={item} key={item} disabled>
                                  {item}
                                </option>
                              );
                            } else {
                              return (
                                <option value={item} key={item}>
                                  {item}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <select
                          onChange={onHandleChange}
                          value={formValue.color}
                          name="color"
                        >
                          {selectList.color.map((item, idx) => {
                            if (idx == 0) {
                              return (
                                <option value={item} key={item} disabled>
                                  {item}
                                </option>
                              );
                            } else {
                              return (
                                <option value={item} key={item}>
                                  {item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </th>
                      <th>
                        <input
                          type="file"
                          accept="image/*"
                          name="file"
                          onChange={onImageChange}
                        ></input>
                      </th>
                      <th>
                        <input
                          onChange={onHandleChange}
                          className="quantityInput"
                          type="number"
                          id="quantity"
                          name="quantity"
                          min="1"
                          max="10"
                          value={formValue.quantity}
                        />
                      </th>
                      <th></th>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <form onSubmit={onHandleSubmit}>
          <div className="btnLayout">
            <Button
              className="UDBtn"
              variant="outline-danger"
              onClick={(e) => handleDeleteClick(checkedList, e)}
            >
              선택상품 삭제
            </Button>
            <Button
              className="UDBtn"
              variant={disabledBtn ? "" : "outline-warning"}
              type="submit"
              disabled={disabledBtn}
              onClick={(e) => {
                handleEditClick(customProductId, editData, imageFile);
              }}
            >
              수정내용 저장
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
