import './Review.css';
import React, { useState, useEffect } from 'react';
import Checkbox from '../../component/Checkbox';
import ImageButton from '../../component/ImageButton';
import Image from '../../component/Image';
import Input from '../../component/Input';
import pencil from '../../image/icon/pencil.png';
import star from '../../image/icon/star.png';
import star_filled from '../../image/icon/star.png';
import { getReview } from '../../axios/review/Review';

function Modal() {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="stars">
          <img src={star} />
          <img src={star} />
          <img src={star} />
          <img src={star} />
          <img src={star} />
        </div>
        <Input inputItem={{ name: 'content' }} />
      </div>
    </div>
  );
}

export default function Review() {
  useEffect(() => {
    getReview('LIB-001', 0, 5, false);
  }, []);

  const [modal, showModal] = useState(false);

  return (
    <div className="review">
      {modal ? <Modal /> : <></>}
      <div className="tab">리뷰</div>
      <div className="title-div">
        <div className="title">구매평 (개수)</div>
        <ImageButton
          type="button"
          image={pencil}
          onClick={() => {
            showModal(true);
          }}
        />
      </div>
      <div className="filter">
        <Checkbox text="포토 구매평만 보기" />
      </div>
      <div className="review-content">
        <div className="user">
          <Image image={pencil} />
          <div className="name">닉네임</div>
          <div>⭐⭐⭐⭐⭐</div>
        </div>
        <div className="content">리뷰 내용요요요요요요요요용</div>
      </div>
    </div>
  );
}
