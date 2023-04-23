import "./Review.css";
import React, { useState, useEffect } from "react";
import Checkbox from "../../component/Checkbox";
import Image from "../../component/Image";
import ImageInput from "../../component/ImageInput";
import Button from "../../component/Button";
import pencil from "../../image/icon/pencil.png";
import star from "../../image/icon/star.png";
import star_filled from "../../image/icon/star_filled.png";
import close from "../../image/icon/close.png";
import { deleteReview, getReview, putReview } from "../../axios/review/Review";

function Modal(props) {
  const [rating, setRating] = useState(props.reviewInfo.rating);

  return (
    <div className="modal">
      <div className="modal-content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(rating);
            console.log(e.target.content.value);
            console.log(e.target.file[0].files);
            console.log(e.target.file[1].files);
            console.log(e.target.file[2].files);
            const dto = {
              rating: rating,
              content: e.target.content.value,
            };
            putReview(dto, e.target.file, props.reviewInfo.reviewId);
          }}
        >
          <div className="title">
            <span></span>
            <span>리뷰 작성</span>
            <img src={close} onClick={props.closeModal} />
          </div>
          <div className="rating">
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
          <textarea
            name="content"
            value={props.reviewInfo.content}
            required
          ></textarea>
          <div className="images">
            <ImageInput imgFile={props.reviewInfo.files[0]} />
            <ImageInput imgFile={props.reviewInfo.files[1]} />
            <ImageInput imgFile={props.reviewInfo.files[2]} />
          </div>
          <Button text="등록" />
        </form>
      </div>
    </div>
  );
}

function ReviewContent() {
  const [modal, showModal] = useState(false);
  // dummy data
  const [reviewInfo, setReviewInfo] = useState({
    reviewId: 1,
    image: pencil, // 프로필 이미지
    nickname: "닉네임",
    rating: 5,
    content: "리뷰 내용요요요요요요요요용",
    files: [pencil, star_filled, star_filled], // 리뷰에 첨부한 이미지
  });

  const filesChildNode = [];
  reviewInfo.files.map((file) => {
    filesChildNode.push(<Image image={file} />);
  });

  return (
    <div className="review-content">
      {modal ? (
        <Modal closeModal={() => showModal(false)} reviewInfo={reviewInfo} />
      ) : (
        <></>
      )}
      <div className="review-header">
        <div className="user">
          <Image image={reviewInfo.image} />
          <div className="name">닉네임</div>
          <div className="rating">
            <img src={star_filled} />
            <img src={reviewInfo.rating < 2 ? star : star_filled} />
            <img src={reviewInfo.rating < 3 ? star : star_filled} />
            <img src={reviewInfo.rating < 4 ? star : star_filled} />
            <img src={reviewInfo.rating < 5 ? star : star_filled} />
          </div>
        </div>
        <div className="content-buttons">
          <span>
            <a
              onClick={() => {
                showModal(true);
              }}
            >
              수정
            </a>
          </span>
          <span>|</span>
          <span>
            <a
              onClick={() => {
                deleteReview(reviewInfo.reviewId);
              }}
            >
              삭제
            </a>
          </span>
        </div>
      </div>
      <div className="content">{reviewInfo.content}</div>
      <div className="files">{filesChildNode}</div>
    </div>
  );
}

export default function Review() {
  useEffect(() => {
    getReview("LIB-001", 0, 5, false);
  }, []);

  return (
    <div className="review">
      <div className="tab">리뷰</div>
      <div className="title-div">
        <div className="title">구매평 (개수)</div>
      </div>
      <div className="filter">
        <Checkbox text="포토 구매평만 보기" />
      </div>
      <ReviewContent />
      <div className="pages">
        <span className="active">1</span>
        <span>2</span>
      </div>
    </div>
  );
}
