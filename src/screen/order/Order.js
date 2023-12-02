import './Order.css';
import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookie from '../redirect/Cookie';
import { getProductInfo } from '../../axios/order/Order';
import OrderTab from '../../component/order/OrderTab';
import ProductImage from '../../component/order/ProductImage';
import OrderOptions from '../../component/order/OrderOptions';
import { CHOOSE } from '../../constants/path';

const Order = () => {
  const [productInfo, setProductInfo] = useState({});
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.state?.productId;

  const retriveProductData = () => {
    if (!productId) {
      navigate(CHOOSE);
      return;
    }
    getProductInfo(productId).then((res) => {
      setProductInfo(res.data);
      setPrice(res.data.price);
    });
  };

  useEffect(() => {
    retriveProductData();

    window.addEventListener('resize', calcHeight);
    return () => {
      // unmount 시 event 제거
      window.removeEventListener('resize', calcHeight);
    };
  }, []);

  // set product-image top : vertical center
  function calcHeight() {
    const bodyHeight = document.body.clientHeight;
    const productImage = document.querySelector('.product-image');
    const top = (bodyHeight - productImage.clientHeight) / 2;
    productImage.style.top = top + 'px';
  }

  return (
    <div className='order'>
      <Cookie />
      <Header />
      <div className='order-container'>
        <h1 className='product-title'>{productInfo?.name}</h1>
        <div className='order-page'>
          <ProductImage productInfo={productInfo} />
          <OrderOptions
            productId={productId}
            productInfo={productInfo}
            price={price}
            setPrice={setPrice}
          />
        </div>
      </div>
      <OrderTab content={productInfo.content} />
      <Footer />
    </div>
  );
};

export default Order;
