import "./Order.css";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import Review from "./review/Review";
import { useEffect, useState } from "react";
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
import { getProductInfo } from "../../axios/order/Order";

const Order = () => {
  const { frameOption, setFrameOption } = useAppContext();
  const [mode, setMode] = useState("");
  const [productData, setProductData] = useState();
  const [price, setPrice] = useState(productData?.price);

  const retriveProductInfo = () => {
    getProductInfo().then((res) => {
      setProductData(res.data);
      setPrice(res.data.price);
      console.log(res.data);
    });
  };

  useEffect(() => {
    retriveProductInfo();
  }, []);

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
    const options = [
      `${frameOption.mountingMethod}`,
      `${frameOption.basicMaterial}`,
      `${frameOption.additionalMaterial}`,
    ];
    const quantity = `${frameOption.quantity}`;
    const image = e.target.file.files[0];
    const data = {
      productName: productData?.name,
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

  return (
    <div className="order">
      <Cookie />
      <Header />
      <div className="order-container">
        <h1 className="product-title">{productData?.name}</h1>
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
                  {productData?.options[0].optionItems.map((item) => {
                    return (
                      <Radio
                        key={item.id}
                        style={{ marginBottom: "10px" }}
                        name="mountingMethod"
                        text={item.name}
                        onChange={onHandleChange}
                        checked={item.name === frameOption.mountingMethod}
                        required
                      />
                    );
                  })}
                </div>
                <div id="basic-material" className="basic-material">
                  <div className="order-title">기본소재를 선택하세요</div>
                  {productData?.options[1].optionItems.map((item, idx) => {
                    return (
                      <Radio
                        key={item.id}
                        style={{ marginBottom: "10px" }}
                        name="basicMaterial"
                        text={item.name}
                        onChange={onHandleChange}
                        checked={item.name === frameOption.basicMaterial}
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
                    {productData?.options[2].optionItems.map((item, idx) => {
                      return (
                        <Radio
                          key={item.id}
                          style={{ marginBottom: "10px" }}
                          name="additionalMaterial"
                          text={item.name}
                          onChange={onHandleChange}
                          checked={item.name === frameOption.additionalMaterial}
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
                    <div
                      onClick={(e) =>
                        e.preventDefault() ??
                        (frameOption.mountingMethod !== "" &&
                        frameOption.basicMaterial !== "" &&
                        frameOption.additionalMaterial !== ""
                          ? navigate("/editor")
                          : alert("모든 옵션을 선택해주세요."))
                      }
                    >
                      개성을 추가하러 가기
                    </div>
                  </div>
                </div>
                <div>
                  {productData?.options[3].optionItems.map((item, idx) => {
                    return (
                      <Radio
                        key={item.id}
                        style={{ marginBottom: "10px" }}
                        name="delivery"
                        text={item.name}
                        onChange={onHandleChange}
                        checked={item.name === frameOption.delivery}
                        required
                      />
                    );
                  })}
                </div>
                <div className="quantity">
                  {productData?.name}
                  <input
                    type="number"
                    name="quantity"
                    value={frameOption.quantity}
                    required
                    min={0}
                    onChange={(e) => {
                      onHandleChange(e);
                      setPrice(productData?.price * e.target.value);
                    }}
                  />
                  <span className="price">
                    &#8361;{price?.toLocaleString("ko-KR")}
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
