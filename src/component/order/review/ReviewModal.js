import './ReviewModal.css';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import ImageInputGroup from '../../common/ImageInputGroup';
import star from '../../../image/icon/star.png';
import star_filled from '../../../image/icon/star_filled.png';
import { postReview, patchContents, postImage, delImage } from '../../../axios/order/Review';

import { useState } from 'react';

export default function ReviewModal(props) {
  const modalInfo =
    props.reviewInfo === undefined
      ? {
          rating: 1,
          imageUrls: [],
          content: '',
        }
      : props.reviewInfo;
  const [rating, setRating] = useState(modalInfo.rating);
  const [text, setText] = useState(modalInfo.content);
  let delImageUrls = []; // 삭제된 이미지들
  let imageFiles = []; // 추가된 이미지 파일들
  const onSuccess = undefined ? () => {} : props.onSuccess;

  return (
    <Modal title='리뷰 작성' closeModal={props.closeModal}>
      <form
        className='review-form'
        onSubmit={(e) => {
          e.preventDefault();
          const content = e.target.content.value;
          if (props.reviewInfo === undefined) {
            const dto = {
              rating: rating,
              content: content,
              customProductId: props.customProductId,
            };
            postReview(dto, imageFiles);
          } else {
            try {
              let isModified = false;
              if (modalInfo.rating !== rating || modalInfo.content !== content) {
                const dto = {
                  rating: rating,
                  content: content,
                };
                patchContents(modalInfo.reviewId, dto);
                isModified = true;
              }
              if (imageFiles.length > 0) {
                postImage(modalInfo.reviewId, imageFiles);
                isModified = true;
              }
              if (delImageUrls.length > 0) {
                const dto = {
                  urls: delImageUrls,
                };
                delImage(modalInfo.reviewId, dto);
                isModified = true;
              }
              alert('수정되었습니다!');
              if (isModified) onSuccess();
            } catch (e) {}
          }
          props.closeModal();
        }}
      >
        <div className='rating'>
          <img src={star_filled} onClick={() => setRating(1)} alt='별1' />
          <img src={rating < 2 ? star : star_filled} onClick={() => setRating(2)} alt='별2' />
          <img src={rating < 3 ? star : star_filled} onClick={() => setRating(3)} alt='별3' />
          <img src={rating < 4 ? star : star_filled} onClick={() => setRating(4)} alt='별4' />
          <img src={rating < 5 ? star : star_filled} onClick={() => setRating(5)} alt='별5' />
        </div>
        <textarea
          name='content'
          value={text}
          required
          maxLength={1000}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <ImageInputGroup
          imageUrls={[...modalInfo.imageUrls]}
          addImageFile={(file) => imageFiles.push(file)}
          deleteImageFile={(index) => imageFiles.splice(index, 1)}
          deleteImageUrl={(url) => delImageUrls.push(url)}
          num={5}
          max={10}
        />
        <Button text='등록' />
      </form>
    </Modal>
  );
}
