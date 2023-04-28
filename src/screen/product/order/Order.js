import "./Order.css";
import Header from "../../../component/Header";
import Footer from "../../../component/Footer";
import Review from "../../../screen/review/Review";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import product_img from "../../../image/icon/product.png";
import post from "../../../axios/shopping/Cart";
import Button from "../../../component/Button";
import ImageInput from "../../../component/ImageInput";
import Cookie from "../../auth/redirect/Cookie";

const Order = () => {
  const [mode, setMode] = useState("");
  const [formValue, setFormValue] = useState({
    mounting_method: "",
    basic_material: "",
    add_material: "",
    add_image: "",
    quantity: 1,
  });
  let dto = {};
  let imageFile = "";
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const productName = "Liberty 52_Frame";
    const options = [
      `${formValue.mounting_method}`,
      `${formValue.basic_material}`,
      `${formValue.add_material}`,
    ];
    const quantity = `${formValue.quantity}`;
    const image = e.target.file.files[0];
    const data = {
      productName: productName,
      options: options,
      quantity: parseInt(quantity),
    };
    dto = data;
    imageFile = image;
    switch (mode) {
      case "cart":
        post(dto, imageFile);
        break;
      case "buy":
        navigate("/payment", {
          state: {
            mounting_method: `${formValue.mounting_method}`,
            basic_material: `${formValue.basic_material}`,
            add_material: `${formValue.add_material}`,
            add_image: imageFile,
            quantity: `${formValue.quantity}`,
          },
        });
        break;
    }
  };

  const addCart = () => {
    setMode("cart");
  };

  const buy = () => {
    setMode("buy");
  };

  const defaultPrice = 1550000;
  const [price, setPrice] = useState(defaultPrice);
  return (
    <>
      <Cookie />
      <Header />
      <div className="order-container">
        <h1>Liberty 52_frame</h1>
        <div className="container-2">
          <div className="product">
            <div className="product-image">
              <img src={product_img} alt="제품 이미지" />
            </div>
          </div>
          <div className="order">
            <form className="order-inputs" onSubmit={onHandleSubmit}>
              <div className="order-inputs-selects">
                <div className="mounting-method">
                  <div className="order-title">거치 방식을 선택하세요</div>
                  <div className="radio-btn" style={{ marginBottom: "10px" }}>
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
                  <div className="order-title">기본소재를 선택하세요</div>
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
                  <div className="order-title">
                    추가 하고 싶은 기본소재 옵션을 선택하세요
                  </div>
                  <div className="material-group">
                    <label>
                      <input
                        type="radio"
                        name="add_material"
                        value="유광실버"
                        required
                        onChange={onHandleChange}
                      />
                      유광실버
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="add_material"
                        value="무광실버"
                        onChange={onHandleChange}
                      />
                      무광실버
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="add_material"
                        value="유광백색"
                        onChange={onHandleChange}
                      />
                      유광백색
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="add_material"
                        value="무광백색"
                        onChange={onHandleChange}
                      />
                      무광백색
                    </label>
                  </div>
                </div>
                <div className="add-image">
                  <div className="order-title">나만의 개성을 추가해봐요</div>
                  <div className="radio-btn">
                    {/* <label>
                    <input
                      type="file"
                      accept="image/*"
                      name="add_image"
                      required
                      onChange={onHandleChange}
                    />
                    배경 이미지 추가하기
                  </label> */}
                    <ImageInput />
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
                <div className="order-btn-group">
                  <Button text="구매하기" onClick={buy} />
                  <Button text="장바구니" onClick={addCart} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Review />
      <Footer />
    </>
  );
};

export default Order;
