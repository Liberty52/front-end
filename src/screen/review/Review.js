import './Review.css';
import React, { useState, useEffect } from 'react';
import Checkbox from '../../component/Checkbox';
import ImageButton from '../../component/ImageButton';
import Image from '../../component/Image';
import ImageInput from '../../component/ImageInput';
import Button from '../../component/Button';
import pencil from '../../image/icon/pencil.png';
import star from '../../image/icon/star.png';
import star_filled from '../../image/icon/star_filled.png';
import close from '../../image/icon/close.png';
import { getReview } from '../../axios/review/Review';

function Modal(props) {
  const [rating, setRating] = useState(1);
  return (
    <div className="modal">
      <div className="modal-content">
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log(rating);
            console.log(e.target.content.value);
            console.log(e.target.file[0].files);
            console.log(e.target.file[1].files);
            console.log(e.target.file[2].files);
            // postReview() - axios
          }}
        >
          <div className="title">
            <span></span>
            <span>리뷰 작성</span>
            <img src={close} onClick={props.closeModal} />
          </div>
          <div className="rating" onDrag={e => console.log(e.clientX)}>
            <img src={star_filled} onClick={() => setRating(1)} />
            <img
              src={rating < 2 ? star : star_filled}
              onClick={() => setRating(2)}
            />
            <img
              src={rating < 3 ? star : star_filled}
              onClick={() => setRating(3)}
            />
            <img
              src={rating < 4 ? star : star_filled}
              onClick={() => setRating(4)}
            />
            <img
              src={rating < 5 ? star : star_filled}
              onClick={() => setRating(5)}
            />
          </div>
          <textarea name="content" required />
          <div className="images">
            <ImageInput />
            <ImageInput />
            <ImageInput />
          </div>
          <Button text="등록" />
        </form>
      </div>
    </div>
  );
}

function ReviewContent() {
  return (
    <div className="review-content">
      <div className="user">
        <Image image={pencil} />
        <div className="name">닉네임</div>
        <div className="rating">
          <img src={star_filled} />
          <img src={star_filled} />
          <img src={star_filled} />
          <img src={star_filled} />
          <img src={star_filled} />
        </div>
      </div>
      <div className="content">리뷰 내용요요요요요요요요용</div>
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
      {modal ? <Modal closeModal={() => showModal(false)} /> : <></>}
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
      <ReviewContent />
      <div className="pages">
        <span>1</span>
        <span>2</span>
      </div>
    </div>
  );
}
