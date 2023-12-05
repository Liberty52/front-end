import React, { useEffect, useState } from 'react';
import './Cart.css';
import './CartPrice.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import LButton from '../../component/common/Button';
import { fetchCartData, handleDeleteClick, handleEditClick } from '../../axios/cart/Cart';
import { addComma } from './Comma';
import cookie from 'react-cookies';
import { ACCESS_TOKEN, GUEST_COOKIE } from '../../constants/token';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';
import { MAIN, PAYMENT } from '../../constants/path';
import ImageInput from "../../component/common/ImageInput";
import ModalBtn from "@mui/material/Button";
import PreviewLicense from "../../component/order/previewLicense/PreviewLicense";
import {getLicenseImg} from "../../axios/order/Order";

export default function CartList({ setEmptyMode }) {
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
  const navigate = useNavigate();
  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [deliveryPrice, setDeliveryPrice] = useState(0.0);
  const [paymentValue, setPaymentValue] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [quantity, setQuantity] = useState();
  const [hidden, setHidden] = useState([]);
  const [img, setImg] = useState({ id: '', src: '' });
  const [file, setFile] = useState({});
  let [disabledBtn, setDisabledBtn] = useState(true);
  let [customProductId, setCustomProductId] = useState('');
  let [isCustom, setIsCustom] = useState();
  let basicFormValue = {};

  const onHandleImg = (id, src) => {
    setImg({ id, src });
  };
  const onHandleFile = (file) => {
    setFile({ file });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      optionDetailIds: Object.values(formValue).filter(Boolean),
      quantity: Number(quantity),
    };
    const licenseOptionId = {
      licenseOptionId: img.id
    }
    if (editMode) {
      handleEditClick(customProductId, data, file, licenseOptionId, isCustom);
      setEditMode(false);
    }
  };

  const handleRowClick = (id, idx, options, quantity, custom) => {
    setIsCustom(custom);
    let newHidden = [...hidden];
    if (newHidden.indexOf(false) === idx) {
      // when opened edited row
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(true);
    } else {
      newHidden[newHidden.indexOf(false)] = true;
      newHidden[idx] = !newHidden[idx];
      setHidden(newHidden);
      setDisabledBtn(false);
      options.forEach((option) => {
        basicFormValue[option.optionId] = option.detailId;
      });
    }
    setCustomProductId(id);
    setFormValue(basicFormValue);
    setQuantity(quantity);
  };
  const onHandleChange = (value, optionId) => {
    setFormValue({
      ...formValue,
      [optionId]: value,
    });
  };
  const onCheckedElement = (checked, item, price, options, quantity, url, deliveryFee) => {
    const frameOption = {};
    options.map((option) => {
      frameOption[option.optionName] = option.detailName;
    });
    let thisValue = {
      id: item,
      frameOption: frameOption,
      add_image: url,
      quantity: quantity,
      price: price,
    };
    if (checked) {
      setCheckedList([...checkedList, item]);
      setTotalPrice(totalPrice + price);
      setDeliveryPrice(deliveryPrice + (deliveryFee * quantity));
      setPaymentValue([...paymentValue, thisValue]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
      setPaymentValue(paymentValue.filter((data) => data.id !== item));
      setTotalPrice(totalPrice - price);
      setDeliveryPrice(deliveryPrice - (deliveryFee * quantity));
    }
  };

  const [cartData, setCartList] = useState([]);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      fetchCartData(
        sessionStorage.getItem(ACCESS_TOKEN),
        setCartList,
        setEmptyMode,
        setProductOption,
      );
    } else if (cookie.load(GUEST_COOKIE)) {
      fetchCartData(cookie.load(GUEST_COOKIE), setCartList, setEmptyMode, setProductOption);
    } else {
      alert('잘못된 접근입니다');
      return navigate(MAIN);
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      const initialHiddenArray = new Array(cartData.length).fill(true);
      setHidden(initialHiddenArray);
    }
  }, [cartData]);

  function pay() {
    if (checkedList === '') {
      alert('체크된 장바구니 항목이 없습니다');
    } else {
      navigate(PAYMENT, {
        state: {
          checkedList,
          paymentValue,
        },
      });
    }
  }

  const Payment = () => {
    return (
      <div className={isDesktopOrMobile !== true ? 'payBtn' : 'payBtn-mobile'}>
        <LButton onClick={pay} text='선택 상품 주문' />
      </div>
    );
  };
  // const data = mockData;
  if (!cartData || cartData === '') {
    return (
      <div id='cartTable'>
        <div className='cart-header'>
          <h1>장바구니 / Shopping cart</h1>
        </div>
        <Table bordered hover className='cartTable'>
          <thead>
            <tr>
              <th width='5%'></th>
              <th width='15%'>제품명</th>
              <th width='10%'>제품가격</th>
              <th width='35%'>옵션</th>
              <th width='10%'>첨부사진</th>
              <th width='7%'>수량</th>
              <th width='9%'>주문금액</th>
              <th width='9%'>배송비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan='7'>
                <h1>장바구니에 담긴 상품이 없습니다</h1>
              </th>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  } else {
    return (
      <div>
        <div id='cartTable' className={isDesktopOrMobile !== true ? 'cart-left' : 'cart-mobile'}>
          <div className='cart-header'>
            <h1>장바구니 / Shopping cart</h1>
          </div>
          <form onSubmit={onHandleSubmit}>
          <Table bordered hover className='cartTable'>
            <thead>
              <tr>
                <th width='5%'></th>
                <th width='15%'>제품명</th>
                <th width='10%'>제품가격</th>
                <th width='35%'>옵션</th>
                <th width='10%'>첨부사진</th>
                <th width='7%'>수량</th>
                <th width='9%'>주문금액</th>
                <th width='9%'>배송비</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length > 0 &&
                cartData.map((item, idx) => {
                  let orderAmount = 0.0;
                  let totalOptionPrice = 0.0;
                  if (item.options != '') item.options.map((option) => (totalOptionPrice += option.price));
                  orderAmount = (item.price + totalOptionPrice) * item.quantity;
                  return (
                    <>
                      <tr
                        key={idx}
                        onClick={() => handleRowClick(item.id, idx, item.options, item.quantity, item.custom)}
                      >
                        <th>
                          <input
                            type='checkbox'
                            id={item.id}
                            value={orderAmount}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              onCheckedElement(
                                e.target.checked,
                                e.target.id,
                                parseFloat(e.target.value),
                                item.options,
                                item.quantity,
                                item.imageUrl,
                                  item.deliveryFee,
                              );
                            }}
                          ></input>
                        </th>
                        <th>{item.name}</th>
                        <th>{addComma(item.price)}원</th>
                        <th>
                          {item.options && item.options !== '' && item.options.map((option) => (
                              <p>
                                {option.optionName} : {option.detailName} (+{addComma(option.price)}원)
                              </p>
                          ))}
                        </th>
                        <th>
                          <button onClick={() => window.open(item.imageUrl, '_blank')}>
                            <img
                                src={item.imageUrl}
                                alt='이미지 링크'
                                style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                            />
                          </button>
                        </th>
                        <th>{item.quantity}</th>
                        <th>{addComma(orderAmount)}원</th>
                        <th>{addComma(item.deliveryFee)}원</th>
                      </tr>
                      <tr style={hidden[idx] ? { display: 'none' } : { display: '', backgroundColor: '#f0f0f0' }}>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                          >
                            {item.custom ? (
                                productOption[0] && productOption[0].productOptionList ? (
                                    productOption[0].productOptionList.map((option) => {
                                      let selectId = option.optionId;
                                      let placeholderContent = `"${option.optionName}"을(를) 선택해주세요`;

                                      const options = option.optionDetailList.map((optionDetail) => ({
                                        value: optionDetail.optionDetailId,
                                        label: optionDetail.optionDetailName,
                                      }));

                                      return (
                                          <th key={option.optionId}>
                                            <Select
                                                style={{ width: '200px', fontSize: '12px' }}
                                                onChange={(e) => onHandleChange(e.value, selectId)}
                                                placeholder={placeholderContent}
                                                options={options}
                                            />
                                          </th>
                                      );
                                    })
                                ) : null
                            ) : (

                                (() => {
                                  const matchedIndex = productOption.findIndex(optionItem => optionItem.productId === item.productId);

                                  if (matchedIndex !== -1) {
                                    return productOption[matchedIndex].productOptionList.map((option) => {
                                      let selectId = option.optionId;
                                      let placeholderContent = `"${option.optionName}"을(를) 선택해주세요`;

                                      const options = option.optionDetailList.map((optionDetail) => ({
                                        value: optionDetail.optionDetailId,
                                        label: optionDetail.optionDetailName,
                                      }));

                                      return (
                                          <th key={option.optionId}>
                                            <Select
                                                style={{ width: '200px', fontSize: '12px' }}
                                                onChange={(e) => onHandleChange(e.value, selectId)}
                                                placeholder={placeholderContent}
                                                options={options}
                                            />
                                          </th>
                                      );
                                    });
                                  }
                                })()
                            )}
                          </div>
                        </th>

                        <th>
                          <AddImage
                              custom={item.custom}
                              onHandleImg={onHandleImg}
                              productId={item.productId}
                              onHandleFile={onHandleFile}
                          />
                        </th>
                        <th>
                          <input
                            onChange={(e) => setQuantity(e.target.value)}
                            className='quantityInput'
                            type='number'
                            id='quantity'
                            name='quantity'
                            min='1'
                            max='10'
                            value={quantity}
                          />
                        </th>
                        <th></th>
                        <th></th>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
            <div className='btnLayout'>
              <Button
                className='UDBtn'
                variant='outline-danger'
                onClick={(e) => handleDeleteClick(checkedList, e)}
              >
                선택상품 삭제
              </Button>
              <Button
                className='UDBtn'
                variant={disabledBtn ? '' : 'outline-warning'}
                type='submit'
                disabled={disabledBtn}
                onClick={(e) => {
                  setEditMode(true);
                }}
              >
                수정내용 저장
              </Button>
            </div>
          </form>
        </div>
        <div className={isDesktopOrMobile !== true ? 'cart-right' : 'cart-mobile'}>
          <div>
            <div className={isDesktopOrMobile !== true ? 'cartprice' : 'cartprice-mobile'}>
              <div className='calcwrap'>
                <div className='orderprice'>
                  <p className='title'>총 주문 금액</p>
                  <p className='price'>{addComma(totalPrice)} 원</p>
                </div>
                <div className='discount'>
                  <p className='title'>적립금</p>
                  <p className='price'>0 원</p>
                </div>
                <div className='shipping'>
                  <p className='title'>배송비</p>
                  <p className='price'>
                    {deliveryPrice === 0.0 ? '무료' : ` ${addComma(deliveryPrice)} 원`}
                  </p>
                </div>
              </div>
              <div className='total'>
                <p className='title'>총 결제 금액</p>
                <p className='price'>{addComma(totalPrice + deliveryPrice)} 원</p>
              </div>
            </div>
            <Payment></Payment>
          </div>
        </div>
      </div>
    );
  }
}

const AddImage = ({ custom, onHandleImg, productId, onHandleFile }) => {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [licenseData, setLicenseData] = useState(null);

  const handleOpen = async () => {
    const response = await getLicenseImg(productId);
    setLicenseData(response.data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleImageSelection = (id, src) => {
    setSelectedImg({ id, src });
    onHandleImg(id, src);
  };
  const handleImageChange = (file) => {
    onHandleFile(file);
  };

  return (
      <>
        {custom ? (
            <div className='radio-btn'>
              <ImageInput
                  width='100%'
                  height='100%'
                  square={true}
                  readOnly={false}
                  onImageChange={handleImageChange}
              />
            </div>
        ) : (
            <>
              {selectedImg ? (
                  <>
                    <img
                        src={selectedImg.src}
                        alt='Selected'
                        onLoad={() => console.log('이미지 로드 성공')}
                        onError={() => console.log('이미지 로드 실패')}
                        style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                        onClick={handleOpen}
                    />
                    {open && (
                        <PreviewLicense
                            optionItems={licenseData?.optionItems || []}
                            onHandleImg={handleImageSelection}
                            open={open}
                            handleClose={handleClose}
                        />
                    )}
                  </>
              ) : (
                  <>
                    <ModalBtn onClick={handleOpen}>라이센스 선택</ModalBtn>
                    {open && (
                        <PreviewLicense
                            optionItems={licenseData?.optionItems || []}
                            onHandleImg={handleImageSelection}
                            open={open}
                            handleClose={handleClose}
                        />
                    )}
                  </>
              )}
            </>
        )}
      </>
  );
};