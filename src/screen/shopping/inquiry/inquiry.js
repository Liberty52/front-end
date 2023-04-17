import React, { useState, useEffect } from 'react';
import './Inquiry.css';
import { fetchOrders } from '../../../axios/inquiry/Inquiry';
import Header from '../../../component/Header';
import Footer from '../../../component/Footer';
import { useNavigate } from 'react-router-dom';

export async function getAccessToken() {
  return localStorage.getItem('ACCESS_TOKEN');
}

function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="InquiryWrapper">
        <div className="content">
          <div className="TCheck">----확인해주십시오.</div>
          <div className="sectionOrder">
            {orders.map(order => (
              <div
                key={order.orderId}
                className="order-container"
                onClick={() => goToDetail(order.orderId)}
              >
                <h5>{order.orderId}</h5>
                <img
                  src={order.productRepresentUrl}
                  alt="representative"
                  className="productRepresentUrl"
                />
                <div className="order-right">
                  <div className="order-right-top">
                    <ul>
                      {order.products.map(product => (
                        <li className="product-item" key={product.name}>
                          <p>{product.name}</p>
                          <p>{product.quantity} 수량</p>
                          <p>₩{product.price.toLocaleString()}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-right-bottom">
                    <p className="address2">
                      <p className="address1">배송지: </p>
                      <p className="address">{order.address}</p>
                    </p>
                    <div className="personal-info">
                      <p>연락처 정보: </p>
                      <p className="email">{order.receiverEmail}</p>
                      <p className="phonenumber">{order.receiverPhoneNumber}</p>
                      <p className="Ordername">{order.receiverName}</p>
                    </div>
                    <p className="date">{order.orderDate}</p>
                    <p className="order-status">{order.orderStatus}</p>
                    {order.orderStatus === 'ORDERED' && (
                      <button className="cancel">취소</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
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
