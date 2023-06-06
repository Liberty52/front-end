import React, { useEffect, useState } from "react";
import "./Cart.css";
import "./CartPrice.css";
import axios from "../../axios/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LButton from "../../component/common/Button";
import { handleDeleteClick, handleEditClick } from "../../axios/cart/Cart";
import { addComma } from "./Comma";
import cookie from "react-cookies";
import { ACCESS_TOKEN } from "../../constants/token";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";

export default function CartList({ setEmptyMode }) {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" });
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [paymentValue, setPaymentValue] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [formValue, setFormValue] = useState({
    holder: "",
    material: "",
    color: "",
    quantity: "",
    // "거치 방식": "",
    // 기본소재: "",
    // "기본소재 옵션": "",
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
    // "거치 방식": "",
    // 기본소재: "",
    // "기본소재 옵션": "",
  };
  const onImageChange = (e) => {
    const img = e.target.files[0];
    setImageFile(img);
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
    if (editMode) {
      handleEditClick(customProductId, editData, imageFile);
      setEditMode(false);
    }
  };
  const handleRowClick = (id, idx, options, quantity) => {
    console.log(options);
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
      // TODO key를 option.optionName으로, value를 그대로 detailName으로 하면 음..
      basicFormValue = {
        holder: options[0].detailName,
        material: options[1].detailName,
        color: options[2].detailName,
        quantity: quantity,
        // "거치 방식": options[0].detailName,
        // 기본소재: options[1].detailName,
        // "기본소재 옵션": options[2].detailName,
      };
    }
    setCustomProductId(id);
    setFormValue(basicFormValue);
  };
  const onHandleChange = (value, name) => {
    setFormValue({
      ...formValue,
      [name]: value,
    });
    setSelectValue(value);
    console.log(selectValue);
    console.log(formValue);
  };
  const onCheckedElement = (checked, item, price, options, quantity, url) => {
    let thisValue = {
      id: item,
      mounting_method: options[0].detailName,
      basic_material: options[1].detailName,
      add_material: options[2].detailName,
      add_image: url,
      quantity: quantity,
    };
    if (checked) {
      setCheckedList([...checkedList, item]);
      setTotalPrice(totalPrice + price);
      setPaymentValue([...paymentValue, thisValue]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
      setPaymentValue(paymentValue.filter((data) => data.id !== item));
      setTotalPrice(totalPrice - price);
    }
  };

  const [data, setCartList] = useState([]);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      axios
        .get("/product/carts", {
          headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        })
        .then((response) => {
          setCartList(response.data);
          if (!response.data || response.data == "") {
            setEmptyMode(true);
            // alert("장바구니에 담긴 상품이 없습니다.");
            // return navigate("/");
          } else {
            axios
              .get("/product/carts/productOptionInfo", {
                headers: {
                  Authorization: sessionStorage.getItem(ACCESS_TOKEN),
                },
              })
              .then((response) => {
                setProductOption(response.data[0].productOptionList);
              });
          }
        });
    } else if (cookie.load("guest")) {
      axios
        .get("/product/guest/carts", {
          headers: {
            Authorization: cookie.load("guest"),
          },
        })
        .then((response) => {
          setCartList(response.data);
          if (!response.data || response.data == "") {
            setEmptyMode(true);
            // alert("장바구니에 담긴 상품이 없습니다.");
            // return navigate("/");
          } else {
            axios
              .get("/product/carts/productOptionInfo", {
                headers: {
                  Authorization: cookie.load("guest"),
                },
              })
              .then((response) => {
                setProductOption(response.data[0].productOptionList);
                console.log(response.data[0].productOptionList);
              });
          }
        });
    } else {
      alert("잘못된 접근입니다");
      return navigate("/");
    }
    console.log(productOption);
  }, []);
  function pay() {
    if (checkedList == "") {
      alert("체크된 장바구니 항목이 없습니다");
    } else {
      navigate("/payment", {
        state: {
          checkedList,
          paymentValue,
        },
      });
    }
  }

  const Payment = () => {
    return (
      <div className={isDesktopOrMobile !== true ? "payBtn" : "payBtn-mobile"}>
        <LButton onClick={pay} text="선택 상품 주문" />
      </div>
    );
  };
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
      <div>
        <div
          id="cartTable"
          className={isDesktopOrMobile !== true ? "cart-left" : "cart-mobile"}
        >
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
                <th width="12%">제품가격</th>
                <th width="33%">옵션</th>
                <th width="10%">첨부사진</th>
                <th width="10%">수량</th>
                <th width="15%">주문금액</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, idx) => {
                  let orderAmount = 0.0;
                  let totalOptionPrice = 0.0;
                  item.options.map(
                    (option) => (totalOptionPrice += option.price)
                  );
                  orderAmount = (item.price + totalOptionPrice) * item.quantity;
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
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              onCheckedElement(
                                e.target.checked,
                                e.target.id,
                                parseFloat(e.target.value),
                                item.options,
                                item.quantity,
                                item.imageUrl
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {productOption.map((option) => {
                              let selectName = "";
                              const selectOptionName = option.optionName;
                              let placeholderContent = `"${selectOptionName}"을(를) 선택해주세요`;

                              if (option.optionName === "거치 방식") {
                                selectName = "holder";
                              } else if (option.optionName === "기본소재") {
                                selectName = "material";
                              } else if (
                                option.optionName === "기본소재 옵션"
                              ) {
                                selectName = "color";
                              } else {
                                selectName = "택배";
                              }

                              const options = option.optionDetailList.map(
                                (optionDetail) => ({
                                  value: optionDetail.optionDetailName,
                                  label: optionDetail.optionDetailName,
                                })
                              );

                              return (
                                <th key={option.optionId}>
                                  <Select
                                    style={{ width: "200px", fontSize: "12px" }}
                                    onChange={(e) =>
                                      onHandleChange(e.value, selectName)
                                    }
                                    placeholder={placeholderContent}
                                    options={options}
                                  />
                                </th>
                              );
                            })}
                          </div>
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
                            onChange={(e) =>
                              onHandleChange(e.target.value, e.target.name)
                            }
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
                  setEditMode(true);
                }}
              >
                수정내용 저장
              </Button>
            </div>
          </form>
        </div>
        <div
          className={isDesktopOrMobile !== true ? "cart-right" : "cart-mobile"}
        >
          <div>
            <div
              className={
                isDesktopOrMobile !== true ? "cartprice" : "cartprice-mobile"
              }
            >
              <div className="calcwrap">
                <div className="orderprice">
                  <p className="title">총 주문 금액</p>
                  <p className="price">{addComma(totalPrice)} 원</p>
                </div>
                <div className="discount">
                  <p className="title">적립금</p>
                  <p className="price">0 원</p>
                </div>
                <div className="shipping">
                  <p className="title">배송비</p>
                  <p className="price">무료</p>
                </div>
              </div>
              <div className="total">
                <p className="title">총 결제 금액</p>
                <p className="price">{addComma(totalPrice)} 원</p>
              </div>
            </div>
            <Payment></Payment>
          </div>
        </div>
      </div>
    );
  }
}
