import './Payment.css';
import { useLocation } from 'react-router-dom';
// import Header from '../../../component/Header';
import Button from '../../../component/Button';
import InputGroup from '../../../component/InputGroup';
import Checkbox from '../../../component/Checkbox';
import liberty52 from '../../../image/icon/liberty52.jpg';
import { useEffect, useState } from 'react';
import PaymentInfo from "./PaymentInfo";

function Header() {
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

function PaymentSection(props) {
  const paymentItems = [
    {
      type: 'text',
      name: 'receiverName',
      required: true,
      maxLength: 25,
      value: props.paymentInfo.receiverName,
    },
    {
      type: 'text',
      name: 'address1',
      required: true,
      value: props.paymentInfo.address1,
    },
    {
      type: 'text',
      name: 'address2',
      required: true,
      value: props.paymentInfo.address2,
    },
    {
      type: 'text',
      name: 'zipCode',
      required: true,
      value: props.paymentInfo.zipCode,
      pattern: '[0-9]*',
    },
  ];

  const contactItems = [
    {
      type: 'email',
      name: 'receiverEmail',
      required: true,
      value: props.paymentInfo.receiverEmail,
    },
    {
      type: 'text',
      name: 'receiverPhoneNumber',
      required: true,
      pattern: '01[0,1][0-9]{6,8}',
      maxLength: 11,
      title: 'ex) 01012341234',
      value: props.paymentInfo.receiverPhoneNumber,
    },
  ];

  return (
    <div className="payment-section">
      <form
        onSubmit={e => {
          e.preventDefault();
          props.setSection('confirm');
          props.setPaymentInfo({
            receiverName: e.target.receiverName.value,
            address1: e.target.address1.value,
            address2: e.target.address2.value,
            zipCode: e.target.zipCode.value,
            receiverEmail: e.target.receiverEmail.value,
            receiverPhoneNumber: e.target.receiverPhoneNumber.value,
          });
        }}
      >
        <div className="payment-title">
          어디로 주문하신 제품이 배송되길 원하십니까?
        </div>
        <div className="payment-user">
          <div>이름 및 주소 입력:</div>
          <InputGroup inputItems={paymentItems} />
        </div>
        <div className="payment-contact">
          <div>연락처 정보:</div>
          <InputGroup inputItems={contactItems} />
          <Checkbox text="휴대폰 번호가 없습니다." />
        </div>
        <Button text="결제 페이지로 이동" />
      </form>
    </div>
  );
}

function Product(props) {
  const productInfo = props.productInfo;
  return (
    <div className="confirm-product">
      <img src={liberty52} />
      <div>
        <div className="title">Liberty 52_Frame</div>
        <div>
          <div>{productInfo.mounting_method}</div>
          <div>{productInfo.basic_material}</div>
          <div>{productInfo.add_material}</div>
          <div>{productInfo.quantity}개</div>
        </div>
      </div>
      <span>&#8361;{1550000 * productInfo.quantity}</span>
    </div>
  );
}

function BackgroundImage(props) {
  return (
    <div className="confirm-backgroundImage">
      <div className="title">배경이미지 시안</div>
      <img src={props.add_image} />
    </div>
  );
}

function DeliveryInfo(props) {
  return (
    <div className="confirm-info">
      <div className="title">배송 상세 정보</div>
      <div className="content">
        <div>
          <div>배송지: </div>
          <div>
            ({props.paymentInfo.zipCode}) {props.paymentInfo.address1}{' '}
            {props.paymentInfo.address2}
          </div>
        </div>
        <div>
          <div>연락처 정보:</div>
          <div>{props.paymentInfo.receiverEmail}</div>
          <div>{props.paymentInfo.receiverPhoneNumber}</div>
        </div>
      </div>
    </div>
  );
}


function TermsOfUse() {
  return (
    <div className="confirm-termsOfUse">
      <div className="title">이용 약관</div>
      <div className="content">
        <Checkbox
          text={
            <div>
              <a href="#">Liberty 개인정보 취급방침</a>
              <span>
                에 따라 개인정보를 수집하고, 사용하고, 제3자에 제공하고,
                처리한다는 점에 동의합니다.
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}

function Total(props) {
  return (
    <div className="confirm-total">
      <div className="title">총계</div>
      <div className="contents">
        <div className="content">
          <span>소계</span>
          <span>&#8361;{1550000 * props.quantity}</span>
        </div>
        <div className="content">
          <span>배송</span>
          <span>무료</span>
        </div>
        <div className="content">
          <span>총계</span>
          <span>&#8361;{1550000 * props.quantity}</span>
        </div>
      </div>
    </div>
  );
}

const IMP = window.IMP;
IMP.init("imp07432404");

function ConfirmSection(props) {
  const [payment, setPayment] = useState("card");

  const productName = `Liberty52_Frame ${props.productInfo.quantity} 개`;
  const amount = 1_550_000 * props.productInfo.quantity;
  const bEmail = props.paymentInfo.receiverEmail;
  const bName = props.paymentInfo.receiverName;
  const bTel = props.paymentInfo.receiverPhoneNumber;
  const bAddr = props.paymentInfo.address1;
  const bPostcode = props.paymentInfo.zipCode;

  const requestPay = () => {
    IMP.request_pay({
      pg : 'html5_inicis',
      pay_method : payment,
      merchant_uid: "IMP57008833-33004",
      name : productName,
      amount : 1000,
      currency : 'KRW',
      buyer_email : bEmail,
      buyer_name : bName,
      buyer_tel : bTel,
      buyer_addr : bAddr,
      buyer_postcode : bPostcode,
    }, function (rsp) { // callback
      if (rsp.success) {
        console.log(rsp);
        // 예를들어 결제 진행중입니다라는 페이지로 넘어간다든가?
      } else {
        console.log(rsp);
        // 결제를 실패하였습니다라는 alert (결제실패코드, 실패메시지)
      }
    });
  }

  return (
    <div className="confirm-section">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="payment-title">
          입력하신 사항이 모두 정확한지 확인해주십시오.
        </div>
        <Product productInfo={props.productInfo} />
        <BackgroundImage add_image={props.productInfo.add_image} />
        <DeliveryInfo paymentInfo={props.paymentInfo} />
        <PaymentInfo setPayment={setPayment} />
        <TermsOfUse />
        <Total quantity={props.productInfo.quantity} />
        <Button
            text="결제하기"
            onClick={requestPay}
        />
        <Button
          text="돌아가기"
          onClick={e => {
            e.preventDefault();
            props.setSection('form');
          }}
        />
      </form>
    </div>
  );
}

export default function Payment() {
  const location = useLocation();
  const productInfo = { ...location.state };

  const [section, setSection] = useState('form');
  const [paymentInfo, setPaymentInfo] = useState({
    receiverName: '',
    address1: '',
    address2: '',
    zipCode: '',
    receiverEmail: '',
    receiverPhoneNumber: '',
  });
  return (
    <div className="payment">
      <Header />
      {section === 'form' ? (
        <PaymentSection
          setSection={setSection}
          paymentInfo={paymentInfo}
          setPaymentInfo={setPaymentInfo}
        />
      ) : (
        <ConfirmSection
          setSection={setSection}
          productInfo={productInfo}
          paymentInfo={paymentInfo}
        />
      )}
    </div>
  );
}
