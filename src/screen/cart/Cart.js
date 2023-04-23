import React, { useState, useEffect } from "react";
import "./Cart.css";
import LButton from "../../component/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./CartPrice.css";
import Header from "../../component/Header";
import { GetCartList } from "../../axios/shopping/Cart";
import ImageInput from "../../component/ImageInput";
import cookie from "react-cookies";

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
  const [formValue, setFormValue] = useState({
    holder: "",
    material: "",
    color: "",
    quantity: 1,
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
  const nothingFile = "";
  const basicFormValue = {
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
    let newHidden = [...hidden];
    if (newHidden.indexOf(false) == idx) {
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(true);
    } else {
      newHidden[newHidden.indexOf(false)] = true;
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(false);
    }
    setCustomProductId(id);
    // setImageFile(nothingFile);
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
            alert("장바구니에 담긴 상품이 없습니다.");
            return navigate("/");
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
            alert("장바구니에 담긴 상품이 없습니다.");
            return navigate("/");
          }
        });
    } else {
      alert("잘못된 접근입니다");
      return navigate("/");
    }
  }, []);

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
    <div id="cartTable">
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
            <th width="15%">제품명</th>
            <th width="15%">제품가격</th>
            <th width="30%">옵션</th>
            <th width="15%">첨부사진</th>
            <th width="5%">수량</th>
            <th width="15%">주문금액</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item, idx) => {
              let orderAmount = 0.0;
              orderAmount = item.price * item.quantity;
              return (
                <>
                  <tr
                    key={idx}
                    onClick={() =>
                      handleRowClick(item.id, idx, item.options, item.quantity)
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
                    <th>{item.imageUrl}</th>
                    <th>{item.quantity}</th>
                    <th>{addComma(orderAmount)}원</th>
                  </tr>
                  <tr
                    style={hidden[idx] ? { display: "none" } : { display: "" }}
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
            variant="outline-warning"
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
  const customProductId = {
    ids: checkedList,
  };
  console.log(customProductId);
  if (checkedList == 0) {
    alert("체크된 항목이 없습니다");
  } else {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        const customProductId = checkedList.map((id) => {
          axios
            .delete(
              `https://liberty52.com:444/product/carts/custom-products/${id}`,
              {
                headers: {
                  Authorization: localStorage.getItem("ACCESS_TOKEN"),
                },
              }
            )
            .then(() => {
              window.location.replace("/cart");
            });
        });
      } else {
        axios
          .delete(
            `https://liberty52.com:444/product/guest/carts/custom-products`,
            customProductId,
            {
              headers: {
                Authorization: cookie.load("guest"),
              },
            }
          )
          .then(() => {
            window.location.replace("/cart");
          });
      }
    }
  }
};

const handleEditClick = (customProductId, dto, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  console.log(dto, file);
  console.log(customProductId);
  if (localStorage.getItem("ACCESS_TOKEN")) {
    axios
      .patch(
        `https://liberty52.com:444/product/carts/custom-products/${customProductId}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        window.location.replace("/cart");
      });
  } else {
    axios
      .patch(
        `https://liberty52.com:444/product/guest/carts/custom-products/${customProductId}`,
        formData,
        {
          headers: {
            Authorization: cookie.load("guest"),
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        window.location.replace("/cart");
      });
  }
};

export default function Cart() {
  return (
    <div>
      <Header />
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
