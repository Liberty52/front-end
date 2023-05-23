import "./Detail.css";
import React, { useState, useEffect } from "react";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import CancelModal from "../../component/inquiry/CancelModal";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../axios/axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function InquiryDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const query = useQuery();
  const phoneNumber = query.get("phoneNumber");

  useEffect(() => {
    const getAccessToken = () => {
      return sessionStorage.getItem("ACCESS_TOKEN");
    };

    const fetchOrderDetails = async (orderId, accessToken) => {
      try {
        const response = await axios.get(`/product/orders/${orderId}`, {
          headers: {
            Authorization: ` ${accessToken}`,
          },
        });
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    const fetchGuestOrderDetails = async (orderId, phoneNumber) => {
      try {
        const response = await axios.get(`/product/guest/orders/${orderId}`, {
          headers: {
            Authorization: ` ${phoneNumber}`,
          },
        });
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      fetchOrderDetails(orderId, accessToken);
    } else {
      if (phoneNumber) {
        fetchGuestOrderDetails(orderId, phoneNumber);
      } else {
        const enteredPhoneNumber = prompt("휴대폰 번호를 입력해주세요.");
        fetchGuestOrderDetails(orderId, enteredPhoneNumber);
      }
    }
  }, [orderId, phoneNumber]);
  if (loading) {
    return <div>Loading...</div>;
  }

  function OrderDetailsSection({ orderDetails }) {
    const [modal, showModal] = useState(false);
    return (
      <>
        {modal && (
          <CancelModal
            order={orderDetails}
            closeModal={() => showModal(false)}
          />
        )}
        <div className="title">
          <span>{orderDetails.orderNum}</span>
          <button className="cancel" onClick={() => showModal(true)}>
            주문 취소
          </button>
        </div>
        {orderDetails.products.map((product) => (
          <>
            <div className="section1">
              <ul className="Detailul">
                <li key={product.name} className="DetailProduct">
                  <img
                    src={orderDetails.productRepresentUrl}
                    alt={product.name}
                    className="productRepresentUrl"
                  />
                  <p className="DetailProductName">{product.name}</p>
                  <p className="DetailProductOptions">
                    {product.options.map((option) => (
                      <p key={option}>{option}</p>
                    ))}
                  </p>
                  <p className="DetailProductQuantity">{product.quantity} 개</p>
                  <p className="DetailProductPrice">
                    ₩{product.price.toLocaleString()}
                  </p>
                </li>
              </ul>
            </div>
            <ImgDetailsSection productUrl={product.productUrl} />
          </>
        ))}
      </>
    );
  }

  function ImgDetailsSection({ productUrl }) {
    return (
      <div className="section2">
        <p className="DetailCName">배경이미지 시안</p>
        <div className="content">
          <img src={productUrl} alt="배경이미지 시안" />
        </div>
      </div>
    );
  }
  function DeliveryDetailsSection({ orderDetails }) {
    return (
      <div className="section3">
        <p className="DetailCName">배송 상세 정보</p>
        <div className="content">
          <p className="DetailSpacing">
            <div>배송지: </div>
            <div>{orderDetails.address}</div>
          </p>
          <p className="DetailSpacing">
            <div>연락처 정보: </div>
            <div>{orderDetails.receiverEmail}</div>
            <div>{orderDetails.receiverPhoneNumber}</div>
            <div>{orderDetails.receiverName}</div>
          </p>
        </div>
      </div>
    );
  }

  function PaymentDetailsSection({ orderDetails }) {
    const { paymentType, paymentInfo } = orderDetails;
    let cardInfo;
    if (paymentType === "가상 계좌") {
      cardInfo = `${paymentInfo?.vbankInfo}`;
    } else {
      cardInfo = `${
        paymentInfo?.cardName
      } **** **** **** ${paymentInfo?.cardNumber?.substr(-4)}`;
    }

    return (
      <div className="section4">
        <p className="DetailCName">결제 상세 정보</p>
        <div className="content">
          <p className="DetailSpacing">
            <div>결제 수단: </div>
            <div>
              {paymentType}: {cardInfo}
            </div>
            <div>{orderDetails.orderDate}</div>
          </p>
          <p className="DetailSpacing">
            <div>청구 주소: </div>
            <div>{orderDetails.address}</div>
          </p>
        </div>
      </div>
    );
  }

  function ResultDetailsSection({ orderDetails }) {
    return (
      <div className="section5">
        <p className="DetailCName">총계</p>
        <div className="content-col">
          <div className="FinalTop">
            <p className="charge">
              <div>소계</div>
              <div>₩{orderDetails.totalProductPrice.toLocaleString()}</div>
            </p>
            <p className="delivery">
              <div>배송비</div>
              <div>₩{orderDetails.deliveryFee.toLocaleString()}</div>
            </p>
          </div>
          <div className="FinalBottom">
            <p className="finalDetail">
              <div>총계</div>
              <div>₩{orderDetails.totalPrice.toLocaleString()}</div>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <OrderDetailsSection orderDetails={orderDetails} />
          <DeliveryDetailsSection orderDetails={orderDetails} />
          <PaymentDetailsSection orderDetails={orderDetails} />
          <ResultDetailsSection orderDetails={orderDetails} />
        </>
      )}
    </>
  );
}

export default function Detail() {
  return (
    <div className="detail">
      <Header />
      <div className="container">
        <InquiryDetails />
      </div>
      <Footer />
    </div>
  );
}
