import './Detail.css';
import React, { useState, useEffect } from 'react';
import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import CancelModal from '../../component/inquiry/CancelModal';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../../axios/axios';
import Button from '../../component/common/Button';
import { fetchRealTimeDeliveryInfo } from '../../axios/inquiry/Inquiry';
import PhotoNotFoundImg from '../../image/icon/photo-not-found.svg';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function InquiryDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const query = useQuery();
  const phoneNumber = query.get('phoneNumber');

  useEffect(() => {
    const getAccessToken = () => {
      return sessionStorage.getItem('ACCESS_TOKEN');
    };

    const fetchOrderDetails = async (orderId, accessToken) => {
      try {
        const response = await axios.get(`/product/orders/${orderId}`, {
          headers: {
            Authorization: ` ${accessToken}`,
          },
        });
        setOrderDetails(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
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
        console.error('Error fetching order details:', error);
      }
    };

    const accessToken = getAccessToken();
    if (accessToken) {
      fetchOrderDetails(orderId, accessToken);
    } else {
      if (phoneNumber) {
        fetchGuestOrderDetails(orderId, phoneNumber);
      } else {
        const enteredPhoneNumber = prompt('휴대폰 번호를 입력해주세요.');
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
        {modal && <CancelModal order={orderDetails} closeModal={() => showModal(false)} />}
        <div className='title'>
          <span>{orderDetails.orderNum}</span>
          <button className='cancel' onClick={() => showModal(true)}>
            주문 취소
          </button>
        </div>
        {orderDetails.products.map((product) => (
          <>
            <div className='section1'>
              <ul className='Detailul'>
                <li key={product.name} className='DetailProduct'>
                  <img
                    src={
                      orderDetails.productRepresentUrl
                        ? orderDetails.productRepresentUrl
                        : PhotoNotFoundImg
                    }
                    alt={product.name}
                    className='productRepresentUrl'
                  />
                  <div className='productInfo'>
                    <div className='DetailProductInfo'>
                      <div className='DetailProductName'>{product.name}</div>
                      <div className='DetailProductType'>
                        {product.custom ? 'custom' : 'premium license'}
                      </div>
                    </div>
                    <div className='DetailProductOptions'>
                      {product.options.map((option) => (
                        <div key={option}>{option}</div>
                      ))}
                    </div>
                    <div className='Detail-product-bottom'>
                      <div className='DetailProductQuantity'>{product.quantity} 개</div>
                      <div className='DetailProductPrice'>₩{product.price.toLocaleString()}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <ImgDetailsSection product={product} />
          </>
        ))}
      </>
    );
  }

  function ImgDetailsSection({ product }) {
    console.log(product);
    return (
      <div className='section2'>
        <div className='DetailName'>배경이미지 시안</div>
        <div className='content'>
          <img
            src={product.custom ? product.productUrl : product.licenseArtUrl}
            alt='배경이미지 시안'
            className='Detail-Img'
          />
        </div>
      </div>
    );
  }

  function DeliveryDetailsSection({ orderDetails }) {
    return (
      <div className='section3'>
        <div className='DetailName'>배송 상세 정보</div>
        <div className='content'>
          <div className='DetailSpacing'>
            <div className='strong'>배송지: </div>
            <div>{orderDetails.address}</div>
          </div>
          {orderDetails.orderDelivery !== null ? (
            <div>
              <div className='DetailDelivery_courierName'>
                <div className='strong'>택배사 이름: </div>
                <div>{orderDetails.orderDelivery.name}</div>
              </div>
              <div className='DetailDelivery_trackingNumber strong'>
                <div>운송장 번호: </div>
                <div>{orderDetails.orderDelivery.trackingNumber}</div>
              </div>
              <Button
                className='getDeleiveryInfo'
                text='배송조회'
                onClick={() => {
                  const popup = window.open(
                    'about:blank',
                    '배송조회',
                    'width=500,height=700,top=100,left=100',
                  );
                  fetchRealTimeDeliveryInfo(orderId, phoneNumber, orderDetails, popup);
                }}
              />
            </div>
          ) : (
            <div className='DetailSpacing'>
              <div className='strong'>배송 준비 중</div>
            </div>
          )}
          <div>
            <div className='strong'>연락처 정보: </div>
            <div>{orderDetails.receiverEmail}</div>
            <div>{orderDetails.receiverPhoneNumber}</div>
            <div>{orderDetails.receiverName}</div>
          </div>
        </div>
      </div>
    );
  }

  function PaymentDetailsSection({ orderDetails }) {
    const { paymentType, paymentInfo } = orderDetails;
    let cardInfo;
    if (paymentType === '가상 계좌') {
      cardInfo = `${paymentInfo?.vbankInfo}`;
    } else {
      cardInfo = `${paymentInfo?.cardName} **** **** **** ${paymentInfo?.cardNumber?.substr(-4)}`;
    }

    return (
      <div className='section4'>
        <div className='DetailName'>결제 상세 정보</div>
        <div className='content'>
          <div className='DetailSpacing'>
            <div className='strong'>결제 수단: </div>
            <div className='detail-card'>
              <div>
                ({paymentType}) {cardInfo}
              </div>
            </div>
          </div>
          <div className='DetailSpacing'>
            <div className='strong'>결제 일자:</div>
            <div>{orderDetails.orderDate}</div>
          </div>
          <div>
            <div className='strong'>청구 주소: </div>
            <div>{orderDetails.address}</div>
          </div>
        </div>
      </div>
    );
  }

  function ResultDetailsSection({ orderDetails }) {
    return (
      <div className='section5'>
        <div className='DetailName'>총계</div>
        <div className='content-col'>
          <div className='FinalTop'>
            <div className='charge'>
              <div>소계</div>
              <div>₩{orderDetails.totalProductPrice.toLocaleString()}</div>
            </div>
            <div className='delivery'>
              <div>배송비</div>
              <div>₩{orderDetails.deliveryFee.toLocaleString()}</div>
            </div>
          </div>
          <div className='FinalBottom'>
            <div className='finalDetail'>
              <div>총계</div>
              <div>₩{orderDetails.totalPrice.toLocaleString()}</div>
            </div>
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
    <div className='detail'>
      <Header />
      <div className='container'>
        <InquiryDetails />
      </div>
      <Footer />
    </div>
  );
}
