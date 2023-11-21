/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './Choose.css';
import React, { useState, useEffect } from 'react';
import Footer from '../../component/common/Footer';
import { Rating, Card } from '@mui/material';
import { getProductList } from '../../axios/order/Order';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/common/Header';
import photoNotFound from '../../image/icon/photo-not-found.svg';
import { ORDER } from '../../constants/path';

export default function Choose() {
  const DATA_PER_PAGE = 6;

  const [productContents, setProductContents] = useState([]);
  const [pages, setPages] = useState({
    numberOfElements: 0,
    totalCount: 0,
    pageNumber: 0,
  });
  const [pageNum, setPageNum] = useState(0);

  function getProductFromServer() {
    getProductList(pageNum, DATA_PER_PAGE).then((res) => {
      const contents = res.contents;
      setProductContents([]);
      for (var i = 0; i < contents.length; i++) {
        const productInfo = {
          id: contents[i].id,
          name: contents[i].name,
          state: contents[i].state,
          price: contents[i].price,
          meanRate: contents[i].meanRate,
          pictureUrl: contents[i].pictureUrl,
          custom: contents[i].custom,
        };
        setProductContents((productContents) => [...productContents, productInfo]);
      }
      setPages({
        numberOfElements: res.numberOfElements,
        totalCount: res.totalCount,
        pageNumber: res.pageNumber,
      });
    });
  }

  useEffect(() => {
    getProductFromServer();
  }, [pageNum]);

  function ProductContent(props) {
    const productInfo = props.productInfo;
    const navigate = useNavigate();

    const isSoldOut = productInfo.state === 'SOLD_OUT' ? true : false;

    const cardClicked = () => {

      if (!isSoldOut) {
        navigate(ORDER, {
          state: {
            productId: productInfo.id,
          },
        });
      }
    };

    return (
      <Card
        style={{
          width: '20rem',
          height: '30rem',
          cursor: 'pointer',
          marginBottom: 15,
        }}
        onClick={cardClicked}
      >
        <div className={isSoldOut ? 'product' : 'product on-sale-product'}>
          <div className='product-image-wrapper'>
            <img src={productInfo.pictureUrl ? productInfo.pictureUrl : photoNotFound} />
          </div>
          <div className='product-contents'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <span
                className='choose-productName'
                style={{ textDecoration: isSoldOut && 'line-through' }}
              >
                {productInfo.name}
              </span>
              {isSoldOut && <span className='choose-isnotsale'>(품절)</span>}
            </div>
            <div className='choose-iscustomtext'>
              {productInfo.custom ? 'custom' : 'premium license'}
            </div>
            <div className='choose-productPrice'> {productInfo.price} 원</div>
            <div className='choose-rating'>
              <Rating readOnly defaultValue={productInfo.meanRate} precision={0.5} size='large' />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  function Pages(props) {
    const pages = props.pages;
    const list = [];
    for (let i = 1; i <= (pages.totalCount - 1) / DATA_PER_PAGE + 1; i++) {
      if (i === pages.pageNumber + 1)
        list.push(
          <span
            key={i}
            className='active'
            onClick={() => {
              setPageNum(i - 1);
            }}
          >
            {i}
          </span>,
        );
      else
        list.push(
          <span
            key={i}
            onClick={() => {
              setPageNum(i - 1);
            }}
          >
            {i}
          </span>,
        );
    }
    return <div className='pages'>{list}</div>;
  }

  return (
    <>
      <Header />
      <div className='choose'>
        <h1 className='choose-title'>상품</h1>
        <div className='choose-list'>
          {productContents.length === 0 ? (
            <span>상품이 없습니다.</span>
          ) : (
            productContents.map((productInfo, i) => {
              return <ProductContent key={i} productInfo={productInfo} />;
            })
          )}
        </div>
      </div>

      <div className='review'>
        <Pages className='choose-page' pages={pages} />
      </div>
      <Footer />
    </>
  );
}
