import "./ReviewModal.css";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import ImageInputGroup from "../../component/ImageInputGroup";
import star from "../../image/icon/star.png";
import star_filled from "../../image/icon/star_filled.png";
import { postReview, putReview } from "../../axios/review/Review";

import { useState } from "react";

export default function ReviewModal(props) {
  const modalInfo =
    props.reviewInfo === undefined
      ? {
          rating: 1,
          imageUrls: [],
          content: "",
        }
      : props.reviewInfo;
  const [rating, setRating] = useState(modalInfo.rating);
  const [text, setText] = useState(modalInfo.content);

  return (
    <Modal title="리뷰 작성" closeModal={props.closeModal}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const dto = {
            productName: "Liberty 52_Frame",
            rating: rating,
            content: e.target.content.value,
            orderId: props.orderId,
          };
          if (props.reviewInfo === undefined) {
            postReview(dto, e.target.file);
            props.closeModal();
          } else {
            putReview(dto, e.target.file, props.reviewInfo.reviewId);
            props.closeModal();
          }
        }}
      >
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
          value={text}
          required
          maxLength={1000}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <ImageInputGroup imageUrls={modalInfo.imageUrls} />
        <Button text="등록" />
      </form>
    </Modal>
  );
}
