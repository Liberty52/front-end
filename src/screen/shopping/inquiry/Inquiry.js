import React, { useState, useEffect } from "react";
import "./Inquiry.css";
import { fetchOrders } from "../../../axios/shopping/Inquiry";
import Header from "../../../component/Header";
import Footer from "../../../component/Footer";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../review/Review";
import Button from "../../../component/Button";
import { ACCESS_TOKEN } from "../../../constants/token";


export async function getAccessToken() {
  return  sessionStorage.getItem(ACCESS_TOKEN);
}

function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
 useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const accessToken = await getAccessToken();
        const response = await fetchOrders(accessToken);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrdersData();
  }, []);

  function goToDetail(orderId) {
    navigate(`/detail/${orderId}`);
  }

  const [modal, showModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");
 
  return (
    <>
      <div className="InquiryWrapper">
        {modal ? (
          <Modal
            orderId={selectedOrderId}
            closeModal={() => showModal(false)}
            onClick={console.log(selectedOrderId)}
          />
        ) : (
          <></>
        )}

        <div className="content">
          <div className="TCheck">주문조회</div>
          <div className="sectionOrder">
            {orders.map((order) => (
              <span key={order.orderId}>
                <OrderImg
                  orderId={order.orderId}
                  productRepresentUrl={order.productRepresentUrl}
                  goToDetail={goToDetail}
                />
                <OrderInfo
                  order={order}
                  showModal={showModal}
                  setSelectedOrderId={setSelectedOrderId}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
function OrderImg({ orderId, productRepresentUrl, goToDetail }) {
  return (
    <div className="order-img-wrapper">
      <div className="order-left">
        <h5 onClick={() => goToDetail(orderId)}>{orderId}</h5>
        <img
          src={productRepresentUrl}
          alt="representative"
          className="productRepresentUrl"
        />
      </div>
    </div>
  );
}

function OrderInfo({ order, showModal, setSelectedOrderId }) {
  return (
    <div className="order-info-wrapper">
    <div className="order-right">
      <div className="order-right-top">
        <ul>
          {order.products.map((product) => (
            <li className="product-item" key={product.name}>
              <p>{product.name}</p>
              <p>{product.quantity} 개</p>
              <p>₩{product.price.toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-right-bottom">
        <div className="address2">
          <p className="address1">배송지: </p>
          <p className="address">{order.address}</p>
        </div>
        <div className="personal-info">
          <p>연락처 정보: </p>
          <p className="email">{order.receiverEmail}</p>
          <p className="phonenumber">{order.receiverPhoneNumber}</p>
          <p className="Ordername">{order.receiverName}</p>
        </div>
        <div className="date">{order.orderDate}</div>
        <div className="order-status">{order.orderStatus}</div>
        {order.orderStatus === "ORDERED" && (
          <>
            <button className="cancel">취소</button>
            <Button className="review"
              text="리뷰 쓰기"
              onClick={() => {
                showModal(true);
                setSelectedOrderId(order.orderId);
              }}
            />
          </>
        )}


      </div>
    </div>
    </div>
  );
}
}

export default function inquiry() {
  return (
    <div className="inquiry">
      <Header />
      <OrderList />

      <Footer />
    </div>
  );
}
