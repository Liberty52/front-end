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
  return sessionStorage.getItem(ACCESS_TOKEN);
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
            <div key={order.orderId} className="order-item">
              <OrderImg
                orderId={order.orderId}
                orderNum={order.orderNum}
                productRepresentUrl={order.productRepresentUrl}
                goToDetail={goToDetail}
              />
              <OrderInfo
                order={order}
                showModal={showModal}
                setSelectedOrderId={setSelectedOrderId}
              />
            </div>
              ))}

          </div>
        </div>
      </div>
    </>
  );
  function OrderImg({ orderId, orderNum, productRepresentUrl, goToDetail }) {
    return (
      <div className="order-img-wrapper">
        <div className="order-left">
          <p onClick={() => goToDetail(orderId)}>{orderNum}</p>
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
            <div className="payment-info">
              <p>결제:</p>
              <p>{order.paymentType}</p>
              <p>{order.paymentInfo.cardName}</p>
              <p>{order.paymentInfo.cardNumber}</p>
            </div>
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
            <div className="order-status-wrapper">
              <div className="order-status">{order.orderStatus}</div>
              <div className="date">{order.orderDate}</div>
              </div>
              {order.orderStatus === "ORDERED" && (
                <div className="buttons">
                  <button className="cancel">취소</button>
                  <Button
                    className="review"
                    text="리뷰 쓰기"
                    onClick={() => {
                      showModal(true);
                      setSelectedOrderId(order.orderId);
                    }}
                  />
                </div>
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
