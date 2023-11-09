import './Order.css';
import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookie from '../redirect/Cookie';
import { getProductInfo } from '../../axios/order/Order';
import OrderTab from '../../component/order/OrderTab';
import ProductImage from '../../component/order/ProductImage';
import OrderOptions from '../../component/order/OrderOptions';

const Order = () => {
  const [productInfo, setProductInfo] = useState({});
  const location = useLocation();

  const retriveProductData = () => {
    getProductInfo(location.state.productId).then((res) => {
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
          <OrderOptions productInfo={productInfo} />
        </div>
      </div>
      <OrderTab content={productInfo.content} />
      <Footer />
    </div>
  );
};

export default Order;
