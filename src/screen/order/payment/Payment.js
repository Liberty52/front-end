import './Payment.css';
import DaumPostcode from 'react-daum-postcode';
import Header from '../../../component/common/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../component/common/Button';
import Input from '../../../component/common/Input';
import Checkbox from '../../../component/common/Checkbox';
import Modal from '../../../component/common/Modal';
import liberty52 from '../../../image/icon/liberty52.jpg';
import { useState } from 'react';
import {
  checkCardPayApproval,
  payByVBank,
  prepareCard,
  prepareCardCart,
  payByVBankCart,
} from '../../../axios/order/Payment';
import PaymentInfo from './PaymentInfo';
import CenterCircularProgress from '../../../component/common/CenterCircularProgress';
import { ACCESS_TOKEN } from '../../../constants/token';
import { DETAIL, GUEST_DETAIL } from '../../../constants/path';

function AddressSearchModal(props) {
  return (
    <Modal title='주소 검색' closeModal={props.closeModal}>
      <DaumPostcode
        onComplete={(data) => {
          props.setAddress({
            address1: data.buildingName
              ? data.address + ' (' + data.buildingName + ')'
              : data.address,
            zipCode: data.zonecode,
          });
          props.closeModal();
        }}
        autoClose={false}
      />
    </Modal>
  );
}

function PaymentSection(props) {
  const deliveryInfo = props.deliveryInfo;
  const [address, setAddress] = useState({
    address1: '',
    zipCode: '',
  });
  const [addressError, setAddressError] = useState('');
  const [modal, setModal] = useState(false); // 주소 검색창 (react daum postcoded)

  return (
    <div className='payment-section'>
      {modal && <AddressSearchModal setAddress={setAddress} closeModal={() => setModal(false)} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!address.address1 || !address.zipCode) {
            setAddressError('주소를 입력하세요.'); // 주소가 입력되지 않았을 때 에러 메시지 설정
            return;
          }
          setAddressError(''); // 에러 메시지 초기화
          props.setSection('confirm');
          props.setDeliveryInfo({
            receiverName: e.target.receiverName.value,
            address1: address.address1,
            address2: e.target.address2.value,
            receiverEmail: e.target.receiverEmail.value,
            zipCode: address.zipCode,
            receiverPhoneNumber: e.target.receiverPhoneNumber.value,
          });
        }}
      >
        <div className='payment-title'>어디로 주문하신 제품이 배송되길 원하십니까?</div>
        <div className='payment-user'>
          <div className='input-title'>이름 및 주소 입력:</div>
          <div className='inputs'>
            <Input
              type='text'
              name='receiverName'
              label='이름'
              required
              maxLength={25}
              value={deliveryInfo.receiverName}
            />
            <div className='input-button'>
              <Input
                type='text'
                name='address1'
                label='주소'
                required
                maxLength={25}
                readOnly
                value={address.address1 ? '(' + address.zipCode + ') ' + address.address1 : ''}
              />
              <Button type='button' text='주소 검색' onClick={() => setModal(true)} />
            </div>
            <span className='error-message'>{addressError}</span> {''}
            <Input
              type='text'
              name='address2'
              label='상세 주소'
              required
              value={deliveryInfo.address2}
            />
          </div>
        </div>
        <div className='payment-contact'>
          <div className='input-title'>연락처 정보:</div>
          <div className='inputs'>
            <Input
              type='email'
              name='receiverEmail'
              label='이메일'
              required
              value={deliveryInfo.receiverEmail}
            />
            <Input
              type='text'
              name='receiverPhoneNumber'
              label='휴대폰 번호'
              required
              pattern='01[0,1][0-9]{6,8}'
              maxLength={11}
              title='ex) 01012341234'
              value={deliveryInfo.receiverPhoneNumber}
            />
          </div>
        </div>
        <Button text='결제 페이지로 이동' />
      </form>
    </div>
  );
}

function Product(props) {
  const productInfo = props.productInfo;

  return (
    <div className='confirm-product'>
      <img src={liberty52} alt='제품 이미지' />
      <div>
        <div className='title'>{productInfo.productName}</div>
        <div>
          {Object.values(productInfo.frameOption).map((option, idx) => {
            return <div key={idx}>{option.name}</div>;
          })}
        </div>
      </div>
      <div>{productInfo?.quantity}개</div>
      <span>
        &#8361;
        {(productInfo?.price).toLocaleString('ko-KR')}
      </span>
    </div>
  );
}

function BackgroundImage(props) {
  const [imageSrc, setImageSrc] = useState(props.add_image);

  function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }

  if (getType(imageSrc) === 'File') {
    const reader = new FileReader();
    reader.readAsDataURL(imageSrc);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
  }
  return (
    <div className='confirm-backgroundImage'>
      <div className='title'>배경이미지 시안</div>
      <img src={imageSrc} alt='배경 이미지' />
    </div>
  );
}

function DeliveryInfo(props) {
  const deliveryInfo = props.deliveryInfo;
  return (
    <div className='confirm-info'>
      <div className='title'>배송 상세 정보</div>
      <div className='content'>
        <div>
          <div>배송지: </div>
          <div>
            ({deliveryInfo.zipCode}) {deliveryInfo.address1}{' '}
          </div>
          <div>{deliveryInfo.address2}</div>
        </div>
        <div>
          <div>연락처 정보:</div>
          <div>{deliveryInfo.receiverEmail}</div>
          <div>
            {deliveryInfo.receiverPhoneNumber === ''
              ? '휴대폰 번호 미입력'
              : deliveryInfo.receiverPhoneNumber}
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsOfUse() {
  const [modal, setModal] = useState(false);

  return (
    <div className='confirm-termsOfUse'>
      {modal ? (
        <Modal title='개인정보 취급방침' closeModal={() => setModal(false)}>
          이용약관입니다. 추후 입력해주세요!
        </Modal>
      ) : (
        <></>
      )}
      <div className='title'>이용 약관</div>
      <div className='content'>
        <Checkbox
          name='termsOfUse'
          independentText1={
            <button
              type='button'
              onClick={() => {
                setModal(true);
              }}
            >
              Liberty 개인정보 취급방침
            </button>
          }
          text='
              에 따라 개인정보를 수집하고, 사용하고, 제3자에 제공하고,
              처리한다는 점에 동의합니다.
          '
        />
      </div>
    </div>
  );
}

function Total(props) {
  const deliverPrice = props.deliverPrice;
  const price = props.price;

  return (
    <div className='confirm-total'>
      <div className='title'>총계</div>
      <div className='contents'>
        <div className='content'>
          <span>소계</span>
          <span>&#8361;{price.toLocaleString('ko-KR')}</span>
        </div>
        <div className='content'>
          <span>배송</span>
          <span>
            {deliverPrice === 0 ? '무료' : '&#8361;' + deliverPrice.toLocaleString('ko-KOR')}
          </span>
        </div>
        <div className='content'>
          <span>총계</span>
          <span>
            &#8361;
            {(price + deliverPrice).toLocaleString('ko-KR')}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConfirmSection(props) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isConfirmProgressing, setIsConfirmProgressing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderNum, setOrderNum] = useState('');

  const productInfo = props.productInfo;
  let productInfoList = productInfo;
  if (!Array.isArray(productInfo)) {
    productInfoList = [productInfo];
  }

  const length = productInfoList.length;
  const productDto = {
    productName: productInfo.productName,
    optionDetailIds: Object.values(productInfoList[0].frameOption).map((optionDetail) => {
      return optionDetail.id;
    }),
    ...(productInfo.licenseOptionDetailId && {
      licenseOptionDetailId: productInfo.licenseOptionDetailId,
    }),
    quantity: productInfo.quantity,
  };

  const destinationDto = {
    receiverName: props.deliveryInfo.receiverName,
    receiverEmail: props.deliveryInfo.receiverEmail,
    receiverPhoneNumber: props.deliveryInfo.receiverPhoneNumber,
    address1: props.deliveryInfo.address1,
    address2: props.deliveryInfo.address2,
    zipCode: props.deliveryInfo.zipCode,
  };
  const imageFile = props.productInfo.add_image;

  const constants = {
    PM_CARD: 'card',
    PM_VBANK: 'vbank',
    defaultVBankAccount: '',
    defaultDepositorName: destinationDto.receiverName,
  };

  const [payment, setPayment] = useState({
    paymentMethod: constants.PM_CARD,
    vBankAccount: constants.defaultVBankAccount,
    depositorName: constants.defaultDepositorName,
    isCashReceipt: false,
  });

  const productIdList = props.productIdList;

  /* IMP 결제 관련 코드 */
  const IMP = window.IMP;
  IMP.init('imp07432404');

  const requestPay = () => {
    if (payment.paymentMethod === constants.PM_CARD) {
      const afterRequest = (res) => {
        const { merchantId, amount } = res;

        IMP.request_pay(
          {
            pg: 'html5_inicis',
            pay_method: payment.paymentMethod,
            merchant_uid: merchantId,
            name:
              length === 1
                ? productDto.productName
                : productDto.productName + '외 ' + length - 1 + '건',
            amount: amount,
            currency: 'KRW',
            buyer_email: destinationDto.receiverEmail,
            buyer_name: destinationDto.receiverName,
            buyer_tel: destinationDto.receiverPhoneNumber,
            buyer_addr: destinationDto.address1,
            buyer_postcode: destinationDto.zipCode,
          },
          async function (rsp) {
            // callback
            if (rsp.success) {
              setIsConfirmProgressing(true);
              try {
                const response = await checkCardPayApproval(
                  merchantId,
                  destinationDto.receiverPhoneNumber,
                );
                setOrderId(response.data.orderId);
                setOrderNum(response.data.orderNum);
                setIsConfirmProgressing(false);
                setSuccess(true);
              } catch (err) {
                setIsConfirmProgressing(false);
                const code = err.response.data.errorCode;
                const message = err.response.data.errorMessage;
                alert(`카드결제가 실패하였습니다.\n에러코드: ${code}\n에러내용:\n${message}`);
              }
            } else {
              if (rsp.error_msg !== '사용자가 결제를 취소하셨습니다') {
                alert(`카드결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
              }
            }
          },
        );
      };
      if (productIdList === '') {
        prepareCard(
          {
            productDto: productDto,
            destinationDto: destinationDto,
          },
          imageFile,
        ).then(afterRequest);
      } else {
        prepareCardCart({
          customProductIdList: productIdList,
          destinationDto: destinationDto,
        }).then(afterRequest);
      }
    } else if (payment.paymentMethod === constants.PM_VBANK) {
      if (payment.vBankAccount === '') {
        alert('가상계좌를 선택해주세요.');
        return;
      }
      if (payment.depositorName === '') {
        payment.depositorName = destinationDto.receiverName;
      }
      setIsConfirmProgressing(true);
      const vBankDto = {
        vbankInfo: payment.vBankAccount,
        depositorName: payment.depositorName,
        isApplyCashReceipt: payment.isCashReceipt,
      };
      if (productIdList === '') {
        // 주문 결제
        payByVBank(
          {
            productDto: productDto,
            destinationDto: destinationDto,
            vbankDto: vBankDto,
          },
          imageFile,
        )
          .then((res) => {
            const { orderId, orderNum } = res;
            setOrderId(orderId);
            setOrderNum(orderNum);
            setIsConfirmProgressing(false);
            setSuccess(true);
          })
          .catch((err) => {
            alert('가상계좌 결제가 실패하였습니다.');
          });
      } else {
        // 장바구니 결제
        payByVBankCart({
          customProductIdList: productIdList,
          destinationDto: destinationDto,
          vbankDto: vBankDto,
        })
          .then((res) => {
            const { orderId, orderNum } = res;
            setOrderId(orderId);
            setOrderNum(orderNum);
            setIsConfirmProgressing(false);
            setSuccess(true);
          })
          .catch((err) => {
            alert('가상계좌 결제가 실패하였습니다.');
          });
      }
    }
  };

  if (success) {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      navigate(`${DETAIL}/${orderId}`);
    } else {
      navigate(`${GUEST_DETAIL}/${orderNum}?phoneNumber=${destinationDto.receiverPhoneNumber}`);
    }
  }

  let totalPrice = 0;

  return (
    <div className='confirm-section'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.target.termsOfUse.checked) {
            alert('이용약관에 동의해주세요');
            return;
          }
          requestPay();
        }}
      >
        <CenterCircularProgress isConfirmProgressing={isConfirmProgressing} />
        <div className='payment-title'>입력하신 사항이 모두 정확한지 확인해주십시오.</div>
        {productInfoList.map((productInfo) => {
          totalPrice += productInfo.price;
          return (
            <>
              <Product productInfo={productInfo} />
              <BackgroundImage add_image={productInfo.add_image} />
            </>
          );
        })}

        <DeliveryInfo deliveryInfo={destinationDto} />
        <PaymentInfo constants={constants} setPayment={setPayment} />
        <TermsOfUse />
        <Total deliverPrice={0} price={totalPrice} />
        <Button text='결제하기' />
        <Button
          type='button'
          text='돌아가기'
          onClick={(e) => {
            e.preventDefault();
            props.setSection('form');
          }}
        />
      </form>
    </div>
  );
}

export default function Payment() {
  const [section, setSection] = useState('form');
  const [deliveryInfo, setDeliveryInfo] = useState({
    receiverName: '',
    address1: '',
    address2: '',
    zipCode: '',
    receiverEmail: '',
    receiverPhoneNumber: '',
  });

  const location = useLocation();
  const locationData = { ...location.state };
  let productInfo = '';
  let productIdList = '';
  if (!locationData.checkedList) {
    productInfo = locationData;
  } else {
    productInfo = locationData.paymentValue;
    productIdList = locationData.checkedList;
  }

  return (
    <div className='payment'>
      <Header />
      {section === 'form' ? (
        <PaymentSection
          setSection={setSection}
          deliveryInfo={deliveryInfo}
          setDeliveryInfo={setDeliveryInfo}
        />
      ) : (
        <ConfirmSection
          setSection={setSection}
          productInfo={productInfo}
          deliveryInfo={deliveryInfo}
          productIdList={productIdList}
        />
      )}
    </div>
  );
}
