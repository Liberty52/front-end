import './NonDetail.css';
import React, { useState, useEffect } from 'react';
import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import { useParams } from 'react-router-dom';
import axios from '../../../axios/axios';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function InquiryDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const { orderId } = useParams();
  const query = useQuery();
  const phoneNumber = query.get('phoneNumber');

  const fetchOrderDetails = async (orderId, phoneNumber) => {
    console.log(orderId);
    console.log(phoneNumber);
    try {
      const response = await axios.get(`/product/guest/orders/${orderId}`, {
        headers: {
          Authorization: phoneNumber,
        },
      });
      const orderDetails = response.data;
      setOrderDetails(orderDetails);
    } catch (error) {
      console.error('Error fetching :', error);
    }
  };

  useEffect(() => {
    fetchOrderDetails(orderId, phoneNumber);
  }, [orderId, phoneNumber]);

  if (!orderDetails.products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="DetailWrapper">
      <div className="Detailcontent">
        <div className="TCheck">----확인해주십시오.</div>

        <div className="Detailcontainer1">
          <h5>{orderDetails.orderId}</h5>
          <ul className="Detailul">
            {orderDetails.products.map(product => (
              <li key={product.name} className="DetailProduct">
                <img
                  src={product.productUrl}
                  alt={product.name}
                  width="50"
                  className="productRepresentUrl"
                />
                <p className="DetailProductName">{product.name}</p>
                <p className="DetailProductQuantity">{product.quantity} 수량</p>
                <p className="DetailProductPrice">
                  ₩{product.price.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="Detailcontainer2">
          <p className="DetailCName">배경이미지 시안</p>
          <img src="#" />
        </div>
        <div className="Detailcontainer3">
          <p className="DetailCName">배송 상세 정보</p>
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

        <div className="Detailcontainer4">
          <p className="DetailCName">결제 상세 정보</p>
          <p className="DetailSpacing">
            <div>결제 수단: </div>
            <div>신용카드 예시</div>
            <div>{orderDetails.orderDate}</div>
          </p>
          <p className="DetailSpacing">
            <div>청구 주소: </div>
            <div>주소 예시</div>
          </p>
        </div>

        <div className="Detailcontainer">
          <p className="DetailCName">총계</p>
          <div className="finalWrapper">
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
      </div>
    </div>
  );
}

export default function Detail() {
  return (
    <>
      <Header />
      <InquiryDetails />
      <Footer />
    </>
  );
}
