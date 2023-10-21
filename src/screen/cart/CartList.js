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
import { ACCESS_TOKEN } from '../../constants/token';
import { useMediaQuery } from 'react-responsive';
import Select from 'react-select';

export default function CartList({ setEmptyMode }) {
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
  const navigate = useNavigate();

  const [checkedList, setCheckedList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [paymentValue, setPaymentValue] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [quantity, setQuantity] = useState();
  const [hidden, setHidden] = useState([]);
  let [imageFile, setImageFile] = useState('');
  let [disabledBtn, setDisabledBtn] = useState(true);
  let [customProductId, setCustomProductId] = useState('');
  let basicFormValue = {};
  const onImageChange = (e) => {
    const img = e.target.files[0];
    setImageFile(img);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      optionDetailIds: Object.values(formValue).filter(Boolean),
      quantity: Number(quantity),
    };
    if (editMode) {
      handleEditClick(customProductId, data, imageFile);
      setEditMode(false);
    }
  };
  const handleRowClick = (id, idx, options, quantity) => {
    let newHidden = [...hidden];
    if (newHidden.indexOf(false) == idx) {
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
  const onCheckedElement = (checked, item, price, options, quantity, url) => {
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
      setPaymentValue([...paymentValue, thisValue]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
      setPaymentValue(paymentValue.filter((data) => data.id !== item));
      setTotalPrice(totalPrice - price);
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
    } else if (cookie.load('guest')) {
      fetchCartData(cookie.load('guest'), setCartList, setEmptyMode, setProductOption);
    } else {
      alert('잘못된 접근입니다');
      return navigate('/');
    }
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      const initialHiddenArray = new Array(cartData.length).fill(true);
      setHidden(initialHiddenArray);
    }
  }, [cartData]);

  function pay() {
    if (checkedList == '') {
      alert('체크된 장바구니 항목이 없습니다');
    } else {
      navigate('/payment', {
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
  if (!cartData || cartData == '') {
    return (
      <div id='cartTable'>
        <div className='cart-header'>
          <h1>장바구니 / Shopping cart</h1>
        </div>
        <Table bordered hover className='cartTable'>
          <thead>
            <tr>
              <th width='5%'>
                {/* <input
                  type="checkbox"
                  onClick={(e) => changeAllCheck(e)}
                  checked={isCheckAll}
                ></input> */}
              </th>
              <th width='15%'>제품명</th>
              <th width='15%'>제품가격</th>
              <th width='25%'>옵션</th>
              <th width='15%'>첨부사진</th>
              <th width='10%'>수량</th>
              <th width='15%'>주문금액</th>
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
          <Table bordered hover className='cartTable'>
            <thead>
              <tr>
                <th width='5%'>
                  {/* <input
                  type="checkbox"
                  onClick={(e) => changeAllCheck(e)}
                  checked={isCheckAll}
                ></input> */}
                </th>
                <th width='15%'>제품명</th>
                <th width='12%'>제품가격</th>
                <th width='33%'>옵션</th>
                <th width='10%'>첨부사진</th>
                <th width='10%'>수량</th>
                <th width='15%'>주문금액</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length > 0 &&
                cartData.map((item, idx) => {
                  let orderAmount = 0.0;
                  let totalOptionPrice = 0.0;
                  item.options.map((option) => (totalOptionPrice += option.price));
                  orderAmount = (item.price + totalOptionPrice) * item.quantity;
                  return (
                    <>
                      <tr
                        key={idx}
                        onClick={() => handleRowClick(item.id, idx, item.options, item.quantity)}
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
                              );
                            }}
                          ></input>
                        </th>
                        <th>{item.name}</th>
                        <th>{addComma(item.price)}원</th>
                        <th>
                          {item.options.map((option) => (
                            <p>
                              {option.optionName} : {option.detailName} (+
                              {addComma(option.price)}원)
                            </p>
                          ))}
                        </th>
                        <th>
                          <button onClick={() => window.open(item.imageUrl, '_blank')}>
                            [이미지 링크]
                          </button>
                        </th>
                        <th>{item.quantity}</th>
                        <th>{addComma(orderAmount)}원</th>
                      </tr>
                      <tr style={hidden[idx] ? { display: 'none' } : { display: '' }}>
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
                            {productOption.map((option) => {
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
                            })}
                          </div>
                        </th>
                        <th>
                          <input
                            type='file'
                            accept='image/*'
                            name='file'
                            onChange={onImageChange}
                          ></input>
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
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
          <form onSubmit={onHandleSubmit}>
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
                  <p className='price'>무료</p>
                </div>
              </div>
              <div className='total'>
                <p className='title'>총 결제 금액</p>
                <p className='price'>{addComma(totalPrice)} 원</p>
              </div>
            </div>
            <Payment></Payment>
          </div>
        </div>
      </div>
    );
  }
}
