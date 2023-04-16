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
    navigate("payment", {
      state: {
        mounting_method: `${formValue.mounting_method}`,
        basic_material: `${formValue.basic_material}`,
        add_material: `${formValue.add_material}`,
        add_image: `${formValue.add_image}`,
      },
    });
  };
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
                <div className="easel">
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
                <div className="wall">
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
                <input
                  type="file"
                  accept="image/*"
                  name="add_image"
                  required
                  onChange={onHandleChange}
                />
              </div>
              <input type="submit" value="구매하기" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
