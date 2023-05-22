import "./Order.css";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import Review from "./review/Review";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import product_img from "../../image/icon/product.png";
import dummy_img from "../../image/icon/dummy.jpg";
import post from "../../axios/cart/Cart";
import Button from "../../component/common/Button";
import ImageInput from "../../component/common/ImageInput";
import Radio from "../../component/common/Radio";
import Cookie from "../redirect/Cookie";
import $ from "jquery";
import useAppContext from "../../hooks/useAppContext";
import {
  ADDITIONAL_MATERIAL,
  BASIC_MATERIAL,
  MOUNTING_METHOD,
} from "../../global/Constants";

const Order = () => {
  const [mode, setMode] = useState("");
  const { frameOption, setFrameOption } = useAppContext();

  let dto = {};
  let imageFile = "";
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    setFrameOption({
      ...frameOption,
      [e.target.name]: e.target.value,
    });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const productName = "Liberty 52_Frame";
    const options = [
      `${frameOption.mountingMethod}`,
      `${frameOption.basicMaterial}`,
      `${frameOption.additionalMaterial}`,
    ];
    const quantity = `${frameOption.quantity}`;
    const image = e.target.file.files[0];
    const data = {
      productName: productName,
      options: options,
      quantity: parseInt(quantity),
    };
    dto = data;
    imageFile = image;
    // eslint-disable-next-line default-case
    switch (mode) {
      case "cart":
        post(dto, imageFile);
        break;
      case "buy":
        if (!frameOption.mountingMethod) {
          alert("거치 방식을 입력해주세요");
          window.location.href = "#mounting-method";
        } else if (!frameOption.basicMaterial) {
          alert("기본소재를 입력해주세요");
          window.location.href = "#basic-material";
        } else if (!frameOption.additionalMaterial) {
          alert("기본 소재 옵션을 입력해주세요");
          window.location.href = "#add-material";
        } else if (!imageFile) {
          alert("이미지를 입력해주세요");
          window.location.href = "#add-image";
        } else {
          navigate("/payment", {
            state: {
              mounting_method: `${frameOption.mountingMethod}`,
              basic_material: `${frameOption.basicMaterial}`,
              add_material: `${frameOption.additionalMaterial}`,
              add_image: imageFile,
              quantity: `${frameOption.quantity}`,
            },
          });
        }
        break;
    }
  };

  const addCart = () => {
    setMode("cart");
  };

  const buy = () => {
    setMode("buy");
  };

  $(".order").on("resize", function () {
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
                <div id="mounting-method" className="mounting-method">
                  <div className="order-title">거치 방식을 선택하세요</div>
                  {MOUNTING_METHOD.map((item, idx) => {
                    return (
                      <Radio
                        key={idx}
                        style={{ marginBottom: "10px" }}
                        name="mountingMethod"
                        text={item}
                        onChange={onHandleChange}
                        checked={item === frameOption.mountingMethod}
                        required
                      />
                    );
                  })}
                </div>
                <div id="basic-material" className="basic-material">
                  <div className="order-title">기본소재를 선택하세요</div>
                  {BASIC_MATERIAL.map((item, idx) => {
                    return (
                      <Radio
                        key={idx}
                        style={{ marginBottom: "10px" }}
                        name="basicMaterial"
                        text={item}
                        onChange={onHandleChange}
                        checked={item === frameOption.basicMaterial}
                        required
                      />
                    );
                  })}
                </div>
                <div id="add-material" className="add-material">
                  <div className="order-title">
                    추가 하고 싶은 기본소재 옵션을 <br />
                    선택하세요
                  </div>
                  <div className="material-group">
                    {ADDITIONAL_MATERIAL.map((item, idx) => {
                      return (
                        <Radio
                          key={idx}
                          style={{ marginBottom: "10px" }}
                          name="additionalMaterial"
                          text={item}
                          onChange={onHandleChange}
                          checked={item === frameOption.additionalMaterial}
                          required
                        />
                      );
                    })}
                  </div>
                </div>
                <div id="add-image" className="add-image">
                  <div className="order-title">나만의 개성을 추가해봐요</div>
                  <div className="radio-btn">
                    <ImageInput width="60px" height="60px" />
                  </div>
                  <div className="order-editor">
                    <div onClick={(e) => e.preventDefault() ?? ((frameOption.mountingMethod !== '' && frameOption.basicMaterial !== '' && frameOption.additionalMaterial !== '') ? navigate("/editor") : alert("모든 옵션을 선택해주세요."))}>개성을 추가하러 가기</div>
                  </div>
                </div>
                <div className="quantity">
                  Liberty 52_frame
                  <input
                    type="number"
                    name="quantity"
                    value={frameOption.quantity}
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
      <img
        src={dummy_img}
        alt="상품 정보"
        style={{ width: "70%", margin: "auto", display: "block" }}
      />
      <Review />
      <Footer />
    </div>
  );
};

export default Order;
