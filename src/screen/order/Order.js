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
import Swal from "sweetalert2";
import { getProductInfo } from "../../axios/order/Order";

const Order = () => {
  const { frameOption, setFrameOption } = useAppContext();
  const [mode, setMode] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const [productInfo, setProductInfo] = useState({});
  const productId = "LIB-001";

  const retriveProductData = () => {
    getProductInfo(productId).then((res) => {
      setProductInfo(res.data);
      setPrice(res.data.price);
    });
  };

  useEffect(() => {
    retriveProductData();
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
      Object.values(frameOption).map((item) => {
        return item;
      }),
    ];
    // const quantity = `${frameOption.quantity}`;
    const image = e.target.file.files[0];
    const data = {
      productName: productInfo?.name,
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
        Object.values(productInfo.options).map((option, idx) => {
          if (!frameOption[`"${option.name}"`]) {
            Swal.fire({
              title: option.name + "를 선택해주세요",
              icon: "warning",
            });
            window.location.href = `#${idx}`;
          } else if (!imageFile) {
            Swal.fire({
              title: "이미지를 입력해주세요",
              icon: "warning",
            });
            window.location.href = "#add-image";
          } else {
            navigate("/payment", {
              state: {
                frameOption: frameOption,
                price: price,
                quantity: quantity,
                add_image: imageFile,
              },
            });
          }
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
        <h1 className="product-title">{productInfo?.name}</h1>
        <div className="order-page">
          <div className="product">
            <div className="product-image">
              <img src={product_img} alt="제품 이미지" onLoad={calcHeight} />
            </div>
          </div>
          <div className="order-options">
            <form className="order-inputs" onSubmit={onHandleSubmit}>
              <div className="order-inputs-selects">
                {productInfo.options &&
                  productInfo.options.map((option, idx) => {
                    return (
                      <div className="option">
                        <div key={idx} id={idx} className="order-title">
                          {option.name}을 선택하세요
                        </div>
                        {option.optionItems &&
                          option.optionItems.map((item, idx) => {
                            return (
                              <Radio
                                key={idx}
                                style={{ marginBottom: "10px" }}
                                name={`"${option.name}"`}
                                text={item.name}
                                onChange={onHandleChange}
                                required
                              />
                            );
                          })}
                      </div>
                    );
                  })}
                <div id="add-image" className="add-image">
                  <div className="order-title">나만의 개성을 추가해봐요</div>
                  <div className="radio-btn">
                    <ImageInput width="60px" height="60px" />
                  </div>
                  <div className="order-editor">
                    <div
                      onClick={(e) => {
                        e.preventDefault() ??
                          Object.values(frameOption).map((option) => {
                            if (option !== "") navigate("/editor");
                            else alert("모든 옵션을 선택해주세요.");
                          });
                      }}
                    >
                      개성을 추가하러 가기
                    </div>
                  </div>
                </div>
                <div className="quantity">
                  {productInfo?.name}
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    min={0}
                    required
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setPrice(productInfo?.price * e.target.value);
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
