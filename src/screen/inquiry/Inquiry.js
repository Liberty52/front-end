import "./Inquiry.css";
import React, { useState, useEffect } from "react";
import { fetchOrders } from "../../axios/inquiry/Inquiry";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import ReviewModal from "../../component/order/review/ReviewModal";
import CancelModal from "../../component/inquiry/CancelModal";
import { useNavigate } from "react-router-dom";
import Button from "../../component/common/Button";
import { ACCESS_TOKEN } from "../../constants/token";

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

  const [reviewModal, showReviewModal] = useState(false);
  const [cancelModal, showCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  return (
    <>
      <div className="InquiryWrapper">
        {reviewModal && (
          <ReviewModal
            orderId={selectedOrder.orderId}
            closeModal={() => showReviewModal(false)}
          />
        )}
        {cancelModal && (
          <CancelModal
            order={selectedOrder}
            closeModal={() => showCancelModal(false)}
          />
        )}

        <div className="content">
          <div className="TCheck">주문조회</div>
          <div className="sectionOrder">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="order-item"
                onClick={() => goToDetail(order.orderId)}
              >
                <OrderImg
                  orderId={order.orderId}
                  orderNum={order.orderNum}
                  productRepresentUrl={order.productRepresentUrl}
                  goToDetail={goToDetail}
                />
                <OrderInfo
                  order={order}
                  showReviewModal={showReviewModal}
                  showCancelModal={showCancelModal}
                  setSelectedOrder={setSelectedOrder}
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
          <p>{orderNum}</p>
          <img
            src={productRepresentUrl}
            alt="representative"
            className="productRepresentUrl"
          />
        </div>
      </div>
    );
  }
  function OrderInfo({
    order,
    showReviewModal,
    showCancelModal,
    setSelectedOrder,
  }) {
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
            <div className="PayAdd-wrapper">
              <div className="payment-info">결제 : </div>
              <div>
                {order.paymentType} {order.paymentInfo.cardName}{" "}
                {order.paymentInfo.cardNumber}
              </div>
              <div className="address2">배송지 :</div>
              <div>{order.address}</div>
            </div>
            <div className="personal-info">
              <div className="info-phone">연락처 정보: </div>
              <div className="email">{order.receiverEmail}</div>
              <div className="phonenumber">{order.receiverPhoneNumber}</div>
              <div className="info-customer">주문자명 : </div>
              <div className="Ordername">{order.receiverName}</div>
            </div>
            <div className="order-status-wrapper">
              <div className="order-status">
                {" "}
                주문 상태 : {order.orderStatus}
              </div>
              <div className="date">주문 날짜 : {order.orderDate}</div>
            </div>
            {(order.orderStatus === "ORDERED" ||
              order.orderStatus === "WAITING_DEPOSIT") && (
              <div className="buttons">
                <button
                  type="button"
                  className="cancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    showCancelModal(true);
                    setSelectedOrder(order);
                  }}
                >
                  주문 취소
                </button>
                <Button
                  type="button"
                  className="review"
                  text="리뷰 쓰기"
                  onClick={(e) => {
                    e.stopPropagation();
                    showReviewModal(true);
                    setSelectedOrder(order);
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
