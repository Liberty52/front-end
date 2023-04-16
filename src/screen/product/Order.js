import "./Order.css";
import { Header, Footer } from "../Main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import product_img from "../../image/icon/product.png";

const Order = () => {
  const [formValue, setFormValue] = useState({
    mounting_method: "",
    basic_material: "",
    add_material: "",
    add_image: "",
    quantity: 1,
  });
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", {
      state: {
        mounting_method: `${formValue.mounting_method}`,
        basic_material: `${formValue.basic_material}`,
        add_material: `${formValue.add_material}`,
        add_image: `${formValue.add_image}`,
        quantity: `${formValue.quantity}`,
      },
    });
  };
  const defaultPrice = 1550000;
  const [price, setPrice] = useState(defaultPrice);
  return (
    <>
      <Header />
      <div className="order-wrap">
        <div className="order-title">
          <h2>Liberty52_frame</h2>
        </div>
        <div className="order">
          <div className="order-image">
            <img src={product_img} alt="제품 이미지" />
          </div>
          <form className="order-inputs" onSubmit={onHandleSubmit}>
            <div className="order-inputs-selects">
              <div className="mounting-method">
                <h3>거치 방식을 선택하세요</h3>
                <div className="radio-btn">
                  <label>
                    <input
                      type="radio"
                      name="mounting_method"
                      value="이젤 거치형"
                      required
                      onChange={onHandleChange}
                    />
                    이젤 거치형
                  </label>
                </div>
                <div className="radio-btn">
                  <label>
                    <input
                      type="radio"
                      name="mounting_method"
                      value="벽걸이형"
                      onChange={onHandleChange}
                    />
                    벽걸이형
                  </label>
                </div>
              </div>
              <div className="basic-material">
                <h3>기본소재를 선택하세요</h3>
                <div className="radio-btn">
                  <label>
                    <input
                      type="radio"
                      name="basic_material"
                      value="1mm 두께 승화전사 인쇄용 알루미늄시트"
                      required
                      onChange={onHandleChange}
                    />
                    1mm 두께 승화전사 인쇄용 알루미늄시트
                  </label>
                </div>
              </div>
              <div className="add-material">
                <h3>추가 하고 싶은 기본소재 옵션을 선택하세요</h3>
                <label>
                  <input
                    type="radio"
                    name="add_material"
                    value="유광 실버"
                    required
                    onChange={onHandleChange}
                  />
                  유광 실버
                </label>
                <label>
                  <input
                    type="radio"
                    name="add_material"
                    value="무광 실버"
                    onChange={onHandleChange}
                  />
                  무광 실버
                </label>
                <label>
                  <input
                    type="radio"
                    name="add_material"
                    value="유광 백색"
                    onChange={onHandleChange}
                  />
                  유광 백색
                </label>
                <label>
                  <input
                    type="radio"
                    name="add_material"
                    value="무광 백색"
                    onChange={onHandleChange}
                  />
                  무광 백색
                </label>
              </div>
              <div className="add-image">
                <h3>나만의 개성을 추가해봐요</h3>
                <div className="radio-btn">
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      name="add_image"
                      required
                      onChange={onHandleChange}
                    />
                    배경 이미지 추가하기
                  </label>
                </div>
              </div>
              <div className="quantity">
                Liberty52_frame
                <input
                  type="number"
                  name="quantity"
                  value={formValue.quantity}
                  required
                  onChange={(e) => {
                    onHandleChange(e);
                    setPrice(defaultPrice * e.target.value);
                  }}
                />
                {price}원
              </div>
              <input type="submit" value="구매하기" />
              <button>장바구니</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
