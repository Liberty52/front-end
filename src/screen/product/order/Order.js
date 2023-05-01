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
import Radio from "../../../component/Radio";
import Cookie from "../../auth/redirect/Cookie";
import $ from "jquery";

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

  $(window).on("resize", function () {
    calcHeight();
  });

  function calcHeight() {
    const bodyHeight = document.body.clientHeight;
    const productImage = document.querySelector(".product-image");

    // set product-image top : vertical center
    const top = (bodyHeight - productImage.clientHeight) / 2;
    productImage.style.top = top + "px";
  }

  const defaultPrice = 1550000;
  const [price, setPrice] = useState(defaultPrice);

  return (
    <div className="order">
      <Cookie />
      <Header />
      <div className="order-container">
        <h1 className="product-title">Liberty 52_frame</h1>
        <div className="order-page">
          <div className="product">
            <div className="product-image">
              <img src={product_img} alt="제품 이미지" onLoad={calcHeight} />
            </div>
          </div>
          <div className="order-options">
            <form className="order-inputs" onSubmit={onHandleSubmit}>
              <div className="order-inputs-selects">
                <div className="mounting-method">
                  <div className="order-title">거치 방식을 선택하세요</div>
                  <Radio
                    style={{ marginBottom: "10px" }}
                    name="mounting_method"
                    text="이젤 거치형"
                    onChange={onHandleChange}
                    required
                  />
                  <Radio
                    name="mounting_method"
                    text="벽걸이형"
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div className="basic-material">
                  <div className="order-title">기본소재를 선택하세요</div>
                  <Radio
                    name="basic_material"
                    text="1mm 두께 승화전사 인쇄용 알루미늄시트"
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div className="add-material">
                  <div className="order-title">
                    추가 하고 싶은 기본소재 옵션을 선택하세요
                  </div>
                  <div className="material-group">
                    <Radio
                      style={{ marginBottom: "10px" }}
                      name="add_material"
                      text="유광실버"
                      onChange={onHandleChange}
                      required
                    />
                    <Radio
                      style={{ marginBottom: "10px" }}
                      name="add_material"
                      text="무광실버"
                      onChange={onHandleChange}
                      required
                    />
                    <Radio
                      style={{ marginBottom: "10px" }}
                      name="add_material"
                      text="유광백색"
                      onChange={onHandleChange}
                      required
                    />
                    <Radio
                      name="add_material"
                      text="무광백색"
                      onChange={onHandleChange}
                      required
                    />
                  </div>
                </div>
                <div className="add-image">
                  <div className="order-title">나만의 개성을 추가해봐요</div>
                  <div className="radio-btn">
                    <ImageInput />
                  </div>
                </div>
                <div className="quantity">
                  Liberty 52_frame
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
                  <span className="price">
                    &#8361;{price.toLocaleString("ko-KR")}
                  </span>
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
    </div>
  );
};

export default Order;
