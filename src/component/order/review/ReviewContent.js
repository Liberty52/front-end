import React, { useState } from 'react';
import Image from '../../common/Image';
import ReviewModal from './ReviewModal';
import ReplyContents from './ReplyContents';
import star from '../../../image/icon/star.png';
import star_filled from '../../../image/icon/star_filled.png';
import { deleteReview } from '../../../axios/order/Review';

export function ReviewContent(props) {
  const [modal, showModal] = useState(false);
  const reviewInfo = props.reviewInfo;
  const getReviewFromServer = props.getReviewFromServer;

  const onUpdateButtonClicked = () => {
    showModal(true);
  };

  const onDeleteButtonClicked = () => {
    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
      deleteReview(reviewInfo.reviewId)
        .then(() => {
          alert('리뷰가 삭제되었습니다.');
          getReviewFromServer();
        })
        .catch((response) => {
          if (response.status === 404) alert('해당 리뷰가 존재하지 않습니다.');
        });
    }
  };

  return (
    <div className='review-content'>
      {modal ? (
        <ReviewModal
          closeModal={() => showModal(false)}
          reviewInfo={reviewInfo}
          onSuccess={() => {
            getReviewFromServer();
          }}
        />
      ) : (
        <></>
      )}
      <div className='review-header'>
        <div className='user'>
          <Image image={reviewInfo.authorProfileUrl === null ? '' : reviewInfo.authorProfileUrl} />
          <div className='name'>{reviewInfo.authorName}</div>
          <div className='rating'>
            <img src={star_filled} />
            <img src={reviewInfo.rating < 2 ? star : star_filled} />
            <img src={reviewInfo.rating < 3 ? star : star_filled} />
            <img src={reviewInfo.rating < 4 ? star : star_filled} />
            <img src={reviewInfo.rating < 5 ? star : star_filled} />
          </div>
        </div>
        {reviewInfo.isYours && (
          <div className='content-buttons'>
            <span>
              <a onClick={onUpdateButtonClicked}>수정</a>
            </span>
            <span>|</span>
            <span>
              <a onClick={onDeleteButtonClicked}>삭제</a>
            </span>
          </div>
        )}
      </div>
      <div className='content'>{reviewInfo.content}</div>
      <div className='files'>
        {reviewInfo.imageUrls.map((imageUrl, index) => {
          return (
            <Image
              key={index}
              image={imageUrl}
              onClick={(e) => {
                const img = e.target;
                const imageCrop = img.parentNode;
                if (imageCrop.style.width === 'auto') {
                  imageCrop.style.width = '100px';
                  imageCrop.style.height = '100px';
                  img.style.width = '100%';
                } else {
                  imageCrop.style.width = 'auto';
                  imageCrop.style.height = 'auto';
                  img.style.width = '300px';
                }
              }}
              square
            />
          );
        })}
      </div>
      <span
        className='reply-num'
        onClick={() => {
          const reply = document.getElementById(reviewInfo.reviewId);
          if (reply.style.display === 'block') {
            reply.style.display = 'none';
          } else {
            reply.style.display = 'block';
          }
        }}
      >
        댓글 {reviewInfo.replies.length}
      </span>
      <ReplyContents id={reviewInfo.reviewId} replies={reviewInfo.replies} />
    </div>
  );
}
