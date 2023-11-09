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
    });
  };

  useEffect(() => {
    retriveProductData();
  }, []);

  return (
    <div className='order'>
      <Cookie />
      <Header />
      <div className='order-container'>
        <h1 className='product-title'>{productInfo?.name}</h1>
        <div className='order-page'>
          <ProductImage productInfo={productInfo} />
          <OrderOptions productId={productId} productInfo={productInfo} />
        </div>
      </div>
      <OrderTab content={productInfo.content} />
      <Footer />
    </div>
  );
};

export default Order;
