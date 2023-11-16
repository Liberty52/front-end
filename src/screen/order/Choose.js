/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './Choose.css';
import React, { useState, useEffect } from 'react';
import Footer from '../../component/common/Footer';
import { Rating, Card } from '@mui/material';
import { Row } from 'react-bootstrap';
import { getProductList } from '../../axios/order/Order';
import { useNavigate } from 'react-router-dom';
import Header from '../../component/common/Header';
import ReviewModal from '../../component/order/review/ReviewModal';
import photoNotFound from '../../image/icon/photo-not-found.svg';
import { ORDER } from '../../constants/path';

export default function Choose() {
  function ChooseContents(id) {
    let list = [];
    for (var i = 0; i < productContents.length; i++) {
      list.push(<ProductContent key={i} productInfo={productContents[i]} />);
    }
    return <div>{list.length > 0 ? list : <span>상품이 없습니다.</span>}</div>;
  }

  function getProductFromServer() {
    getProductList(pageNum, 10).then((res) => {
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
  }, []);

  function ProductContent(props) {
    const [modal, showModal] = useState(false);
    const productInfo = props.productInfo;
    const navigate = useNavigate();
    const cardClicked = () => {
      navigate(ORDER, {
        state: {
          productId: productInfo.id,
        },
      });
    };

    return (
      <>
        <div className='choose'>
          {modal ? (
            <ReviewModal
              closeModal={() => showModal(false)}
              productInfo={productInfo}
              onSuccess={() => {
                getProductFromServer();
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className='choose-mainContainer'>
            <Card style={{ width: '20rem', height: '30rem' }} onClick={cardClicked}>
              <div className='product'>
                <div className='product'>
                  <div className='choose-product' key={productInfo.id}>
                    <span className='product-image img'>
                      <img src={productInfo.pictureUrl ? productInfo.pictureUrl : photoNotFound} />
                    </span>
                    <div className='product-contents'>
                      <div className='choose-isnotsale'>
                        {' '}
                        {productInfo.state === 'ON_SALE' ? (
                          <div onClick={cardClicked}></div>
                        ) : productInfo.state === 'NOT_SALE' ? (
                          <p className='choose-notsale'>품절</p>
                        ) : (
                          <p>미판매</p>
                        )}
                      </div>
                    </div>
                    <div className='product-contents' style={{}}>
                      <Row>
                        <span className='choose-productName'> {productInfo.name}</span>
                        <span className='choose-iscustomtext'>
                          {productInfo.iscustom === 'true' ? 'custom' : <p>premium license</p>}
                        </span>
                        <span className='choose-productPrice'> {productInfo.price}원</span>
                        <span>
                          <div className='choose-producttext'>
                            {' '}
                            {productInfo.state === 'ON_SALE' ? (
                              <></>
                            ) : productInfo.state === 'NOT_SALE' ? (
                              <p>품절</p>
                            ) : (
                              <p>미판매</p>
                            )}
                          </div>
                        </span>
                        <div className='choose-contents'>
                          <Rating
                            readOnly
                            className='choose-contents'
                            defaultValue={productInfo.meanRate}
                            precision={0.5}
                          />
                        </div>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  function Pages(props) {
    const pages = props.pages;
    const list = [];
    for (let i = pages.pageNumber; i <= pages.totalCount; i++) {
      if (i === pages.pageNumber)
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
  const [productContents, setProductContents] = useState([]);
  const [pages, setPages] = useState({
    numberOfElements: 0,
    totalCount: 0,
    pageNumber: 0,
  });
  const [pageNum, setPageNum] = useState(0);

  return (
    <>
      <Header />
      <div className='choose'>
        <div className='choose-container'>
          <h1 className='choose-product'>상품</h1>
          <Row>
            <ChooseContents className='choose-product' productContents={productContents} />
          </Row>
        </div>
      </div>

      <div className='review'>
        <Pages className='choose-page' pages={pages} />
      </div>
      <Footer />
    </>
  );
}
