/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './Review.css';
import React, { useState, useEffect } from 'react';
import Checkbox from '../../common/Checkbox';
import { ReviewContent } from './ReviewContent';
import ReviewPages from './ReviewPages';
import { getReview } from '../../../axios/order/Review';

export default function Review() {
  const [onlyPhoto, setOnlyPhoto] = useState(false);
  const [reviewContents, setReviewContents] = useState([]);
  const [pages, setPages] = useState({
    startPage: 1,
    lastPage: 1,
    currentPage: 1,
  });
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    getReviewFromServer();
  }, [onlyPhoto, pageNum]);

  function getReviewFromServer() {
    getReview('LIB-001', 10, pageNum, onlyPhoto).then((res) => {
      const contents = res.contents;
      setReviewContents([]);
      for (var i = 0; i < contents.length; i++) {
        const reviewInfo = {
          reviewId: contents[i].reviewId,
          rating: contents[i].rating,
          imageUrls: contents[i].imageUrls,
          content: contents[i].content,
          authorProfileUrl: contents[i].authorProfileUrl,
          authorName: contents[i].authorName,
          isYours: contents[i].isYours,
          replies: contents[i].replies,
        };
        setReviewContents((reviewContents) => [...reviewContents, reviewInfo]);
      }
      setPages({
        startPage: res.startPage,
        lastPage: res.lastPage,
        currentPage: res.currentPage,
      });
    });
  }

  return (
    <div className='review'>
      <div className='filter'>
        <Checkbox
          text='포토 구매평만 보기'
          onChange={() => {
            setOnlyPhoto(!onlyPhoto);
          }}
        />
      </div>
      <div>
        {reviewContents.length === 0 ? (
          <span>작성된 구매평이 없습니다.</span>
        ) : (
          reviewContents.map((reviewInfo, i) => {
            return (
              <ReviewContent
                key={i}
                reviewInfo={reviewInfo}
                getReviewFromServer={getReviewFromServer}
              />
            );
          })
        )}
      </div>
      <ReviewPages pages={pages} setPageNum={setPageNum} />
    </div>
  );
}
