// axios
import {
  checkCardPayApproval,
  payByVBank,
  prepareCard,
  prepareCardCart,
  payByVBankCart,
} from '../../../axios/order/Payment';
// constants
import { ACCESS_TOKEN } from '../../../constants/token';
// component
import Checkbox from '../../../component/common/Checkbox';
import Modal from '../../../component/common/Modal';
import Button from '../../../component/common/Button';
import CenterCircularProgress from '../../../component/common/CenterCircularProgress';
// screen
import PaymentInfo from './PaymentInfo';
// image
import liberty52 from '../../../image/icon/liberty52.jpg';
// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Product(props) {
  const productInfo = props.productInfo;
  return (
    <div className='confirm-product'>
      <img src={liberty52} alt='제품 이미지' />
      <div>
        <div className='title'>Liberty 52_Frame</div>
        <div>
          <div>{productInfo.mounting_method}</div>
          <div>{productInfo.basic_material}</div>
          <div>{productInfo.add_material}</div>
        </div>
      </div>
      <div>{productInfo.quantity}개</div>
      <span>&#8361;{(1550000 * productInfo.quantity).toLocaleString('ko-KR')}</span>
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
    <div className='confirm-info delivery-info'>
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
  const quantity = props.quantity;

  return (
    <div className='confirm-total'>
      <div className='title'>총계</div>
      <div className='contents'>
        <div className='content'>
          <span>소계</span>
          <span>&#8361;{(1550000 * quantity).toLocaleString('ko-KR')}</span>
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
            {(1550000 * quantity + deliverPrice).toLocaleString('ko-KR')}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmSection(props) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isConfirmProgressing, setIsConfirmProgressing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderNum, setOrderNum] = useState('');

  const productInfo = props.productInfo;
  let productInfoList = productInfo;

  let quantity = 0;
  if (!Array.isArray(productInfo)) {
    productInfoList = [productInfo];
    quantity = productInfo.quantity;
  } else {
    for (var p of productInfo) {
      quantity += p.quantity;
    }
  }
  const length = productInfoList.length;

  const productDto = {
    productName: 'Liberty 52_Frame',
    options: [
      props.productInfo.mounting_method,
      props.productInfo.basic_material,
      props.productInfo.add_material,
    ],
    quantity: props.productInfo.quantity,
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
      navigate(`/detail/${orderId}`);
    } else {
      navigate(`/product/guest/${orderNum}?phoneNumber=${destinationDto.receiverPhoneNumber}`);
    }
  }

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
        <Total quantity={quantity} deliverPrice={0} />
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
