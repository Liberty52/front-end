import './Inquiry.css';
import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../../axios/inquiry/Inquiry';
import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import ReviewModal from '../../component/order/review/ReviewModal';
import CancelModal from '../../component/inquiry/CancelModal';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/common/Button';
import { ACCESS_TOKEN } from '../../constants/token';
import Swal from 'sweetalert2';
import { DETAIL } from '../../constants/path';
import PhotoNotFoundImg from '../../image/icon/photo-not-found.svg';

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
      } catch (error) {}
    };

    fetchOrdersData();
  }, []);

  function goToDetail(orderId) {
    navigate(`${DETAIL}/${orderId}`);
  }

  const [reviewModal, showReviewModal] = useState(false);
  const [cancelModal, showCancelModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  return (
    <>
      {reviewModal && (
        <ReviewModal
          customProductId={selectedOrder.customProductId}
          closeModal={() => showReviewModal(false)}
        />
      )}
      {cancelModal && (
        <CancelModal order={selectedOrder} closeModal={() => showCancelModal(false)} />
      )}

      <div className='content'>
        <div className='TCheck'>주문조회</div>
        <div className='sectionOrder'>
          {orders.map((order) => (
            <div
              key={order.orderId}
              className='order-item'
              onClick={() => goToDetail(order.orderId)}
            >
              <div className='order-info'>
                <OrderImg
                  orderId={order.orderId}
                  orderNum={order.orderNum}
                  productRepresentUrl={order.productRepresentUrl}
                  paymentType={order.paymentType}
                  goToDetail={goToDetail}
                  showCancelModal={showCancelModal}
                  setSelectedOrder={setSelectedOrder}
                  orderStatus={order.orderStatus}
                />
                <OrderInfo
                  order={order}
                  showReviewModal={showReviewModal}
                  showCancelModal={showCancelModal}
                  setSelectedOrder={setSelectedOrder}
                />
              </div>
              <CancelOrderButton
                order={{
                  orderId: order.orderId,
                  orderStatus: order.orderStatus,
                  paymentType: order.paymentType,
                }}
                showCancelModal={showCancelModal}
                setSelectedOrder={setSelectedOrder}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
  function OrderImg({
    orderId,
    orderNum,
    productRepresentUrl,
    paymentType,
    goToDetail,
    showCancelModal,
    setSelectedOrder,
    orderStatus,
  }) {
    return (
      <div className='order-left'>
        <div className='order-image-wrapper'>
          <img
            style={{ width: !productRepresentUrl && 55 }}
            src={productRepresentUrl ? productRepresentUrl : PhotoNotFoundImg}
            alt='representative'
            className='productRepresentUrl'
          />
        </div>
      </div>
    );
  }

  function OrderInfo({ order, showReviewModal, showCancelModal, setSelectedOrder }) {
    return (
      <div className='order-info-wrapper'>
        <div className='order-right-top'>
          {order.products.map((product) => (
            <div className='product-item' key={product.name}>
              <p>{product.name}</p>
              <p>{product.quantity} 개</p>
              <p>₩{product.price.toLocaleString()}</p>
              <p className='buttons'>
                <Button
                  type='button'
                  className='review'
                  text={product.hasReview ? '리뷰 완료' : '리뷰 쓰기'}
                  disabled={product.hasReview}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (order.orderStatus === '배송완료') {
                      showReviewModal(true);
                      setSelectedOrder({
                        ...product,
                        paymentType: order.paymentType,
                      });
                    } else {
                      Swal.fire({
                        title: '배송 완료 상태만 리뷰 작성 가능합니다.',
                        icon: 'warning',
                      });
                    }
                  }}
                />
              </p>
            </div>
          ))}
        </div>
        <div className='order-right-bottom'>
          <div className='PayAdd-wrapper'>
            <div className='payment-info'>결제 : </div>
            <div className='inquiry-card'>
              {order.paymentType} {order.paymentInfo.cardName} {order.paymentInfo.cardNumber}
            </div>
            <div className='address2'>배송지 :</div>
            <div className='inquiry-address2'>{order.address}</div>
          </div>

          <div className='personal-info'>
            <div className='info-phone'>연락처 정보: </div>
            <div className='email'>{order.receiverEmail}</div>
            <div className='phonenumber'>{order.receiverPhoneNumber}</div>
            <div className='info-customer'>주문자명 : </div>
            <div className='Ordername'>{order.receiverName}</div>
          </div>

          <div className='order-status-wrapper'>
            <div className='order-status'>주문 상태 : </div>
            <div className='order-status-value'>{order.orderStatus}</div>
            <div className='date'>주문 날짜 : </div>
            <div className='order-date'>{order.orderDate}</div>
          </div>
        </div>
      </div>
    );
  }
}

function CancelOrderButton({ order, showCancelModal, setSelectedOrder }) {
  return (
    order.orderStatus === '주문완료' && (
      <div className='cancel-button'>
        <button
          type='button'
          className='cancel'
          onClick={(e) => {
            e.stopPropagation();
            showCancelModal(true);
            setSelectedOrder({ ...order, paymentType: order.paymentType });
          }}
        >
          주문 취소
        </button>
      </div>
    )
  );
}

export default function inquiry() {
  return (
    <div className='inquiry'>
      <Header />
      <OrderList />
      <Footer />
    </div>
  );
}
