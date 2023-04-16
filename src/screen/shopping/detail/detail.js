import './Detail.css';
import React, { useState, useEffect } from 'react';
import youtube_img from '../../../image/icon/youtube.png';
import instargram_img from '../../../image/icon/instagram.png';
import kakaotalk_img from '../../../image/icon/kakao-talk.png';
import { useParams } from 'react-router-dom';
import axios from '../../../axios/axios';


export function Header() {
    const headerItemsLeft = [
      { name: '로고', href: '#' },
      { name: '제품소개', href: '#' },
      { name: '사업소개', href: '#' },
      { name: '지점소개(쇼룸)', href: '#' },
    ];

    const headerLeft = [];
    for (let i in headerItemsLeft) {
      let headerItem = headerItemsLeft[i];
      headerLeft.push(
        <li key={headerItem.name}>
          <a href={'/' + headerItem.href}>{headerItem.name}</a>
        </li>
      );
    }

    const [headerItemsRight, setHeaderItemsRight] = useState();

    useEffect(() => {
      if (localStorage.getItem('ACCESS_TOKEN')) {
        setHeaderItemsRight([
          { name: '내정보', href: 'myInfo' },
          {
            name: '로그아웃',
            onClick: () => {
              if (window.confirm('로그아웃하시겠습니까?')) {
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('REFRESH_TOKEN');
                window.location.href = '/';
              }
            },
            href: '#',
          },
          { name: '장바구니', href: 'cart' },
          { name: '바로구매', href: '#' },
        ]);
      } else {
        setHeaderItemsRight([
          { name: '로그인', href: 'login' },
          { name: '바로구매', href: '#' },
        ]);
      }
    }, []);

    const headerRight = [];
    for (let i in headerItemsRight) {
      let headerItem = headerItemsRight[i];
      headerRight.push(
        <li key={headerItem.name}>
          <button onClick={headerItem.onClick}>
            <a href={'/' + headerItem.href}>{headerItem.name}</a>
          </button>
        </li>
      );
    }
    return (
      <div className="header">
        <ul className="header-items">{headerLeft}</ul>
        <ul className="header-items">{headerRight}</ul>
      </div>
    );
  }
export function Footer() {
    return (
      <footer>
        <div className="inner">
          <div className="menu">
            <ul className="policy">
              <li>이용약관</li>
              <li>개인정보처리방침</li>
            </ul>
            <div className="sns">
              <a href="https://www.youtube.com/channel/UCIbIrjFdjOXjo38wBrfmbug">
                <img src={youtube_img} alt="youtube" />
              </a>
              <a href="https://www.instagram.com/bloomsburylab_official/">
                <img src={instargram_img} alt="instargram" />
              </a>
              <a href="https://pf.kakao.com/_kccws">
                <img src={kakaotalk_img} alt="kakaotalk" />
              </a>
            </div>
          </div>
          <div className="info">
            <div>상호명: (주)블룸즈베리랩</div>
            <div>대표자: 김요섭 | 개인정보관리 책임자: 김요섭</div>
            <div>주소: 서울특별시 강남구 봉은사로 86길 6 레베쌍트빌딩 9층</div>
            <div>대표번호: 02-6419-2004</div>
            <div>이메일: cs@bloomsburylab.com</div>
            <div>
              사업자등록번호: 330-87-02797 | 통신판매업신고번호:
              2023-서울강남-00978
            </div>
          </div>
        </div>
      </footer>
    );
  }
  function InquiryDetails() {
    const [orderDetails, setOrderDetails] = useState({});
    const { orderId } = useParams();
    const accessToken = localStorage.getItem('ACCESS_TOKEN');

    const fetchOrderDetails = (orderId, accessToken) => {
      return axios.get(`/product/orders/${orderId}`, {
        headers: { Authorization: accessToken },
      })
      .then(response => response.data);
    };

    useEffect(() => {
      fetchOrderDetails(orderId, accessToken)
        .then(data => {
          console.log("Order details data:", data); // 로깅 추가
          setOrderDetails(data);
        })
        .catch(error => {
          console.error("Error fetching order details:", error);
        });
    }, [orderId, accessToken]);

    if (!orderDetails.products) {
      return <div>Loading...</div>;
    }



    return (
      <div className='DetailWrapper'>
        <div className="Detailcontent">
          <div className='TCheck'>----확인해주십시오.</div>

          <div className='Detailcontainer1'>

            <h5>{orderDetails.orderId}</h5>
            <ul className='Detailul'>
              {orderDetails.products.map((product) => (
                <li key={product.name} className='DetailProduct'>
                  <img src={product.productUrl} alt={product.name} width="50"  className='productRepresentUrl'/>
                  <p className='DetailProductName'>{product.name}</p>
                  <p className='DetailProductQuantity'>{product.quantity} 수량</p>
                  <p className='DetailProductPrice'>₩{product.price.toLocaleString()}</p>
                </li>
              ))}
            </ul>

          </div>
          <div className='Detailcontainer2'>
            <p className='DetailCName'>배경이미지 시안</p>
            <img src='#'/>
          </div>
          <div className='Detailcontainer3'>
            <p className='DetailCName'>배송 상세 정보</p>
            <p className='DetailSpacing'>
              <div>배송지: </div>
              <div>{orderDetails.address}</div>
            </p>
            <p className='DetailSpacing'>
              <div>연락처 정보: </div>
              <div>{orderDetails.receiverEmail}</div>
              <div>{orderDetails.receiverPhoneNumber}</div>
              <div>{orderDetails.receiverName}</div>
            </p>
          </div>

          <div className='Detailcontainer4'>
            <p className='DetailCName'>결제 상세 정보</p>
            <p className='DetailSpacing'>
              <div>결제 수단: </div>
              <div>신용카드 예시</div>
              <div>{orderDetails.orderDate}</div>
            </p>
            <p className='DetailSpacing'>
              <div>청구 주소: </div>
              <div>주소 예시</div>
            </p>
          </div>

          <div className='Detailcontainer'>
              <p className='DetailCName'>총계</p>
            <div className='finalWrapper'>
              <div className='FinalTop'>
                <p className='charge'>
                  <div>소계</div>
                  <div>₩{orderDetails.totalProductPrice.toLocaleString()}</div>
                </p>
                  <p className='delivery'>
                    <div>배송비</div>
                    <div>₩{orderDetails.deliveryFee.toLocaleString()}</div>
                </p>
              </div>
              <div className='FinalBottom'>
                  <p className='finalDetail'>
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
    <InquiryDetails/>
        <Footer />
      </>
    );
  }
