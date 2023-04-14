import React, { useState, useEffect } from 'react';
import './inquiry.css';
import { fetchOrders } from '../../../axios/Inquiry/Inquiry';

import youtube_img from '../../../image/icon/youtube.png';
import instargram_img from '../../../image/icon/instagram.png';
import kakaotalk_img from '../../../image/icon/kakao-talk.png';

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
export async function getAccessToken() {
  return localStorage.getItem('ACCESS_TOKEN');
}

function OrderList() {
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

  return (
<>
<div className="content">
  <div className="TCheck">----확인해주십시오.</div>
  <div className="section">
  <div>
      {orders.map((order) => (
        <div key={order.orderId}>
          <h2>{order.orderId}</h2>
          <p>{order.orderDate}</p>
          <p>{order.orderStatus}</p>
          <p>{order.address}</p>
          <p>{order.receiverEmail}</p>
          <p>{order.receiverPhoneNumber}</p>
          <p>{order.receiverName}</p>
          <img src={order.productRepresentUrl} alt="representative" />
          <ul>
            {order.products.map((product) => (
              <li key={product.name}>
                {product.name} - {product.quantity}개 / {product.price}원
              </li>
            ))}
          </ul>
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
<>
      <Header />
      <OrderList />
      <Footer />
    </>
  );
}
