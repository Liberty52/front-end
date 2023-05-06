/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import './Review.css';
import React, { useState, useEffect } from 'react';
import Checkbox from '../../component/Checkbox';
import Image from '../../component/Image';
import Button from '../../component/Button';
import ImageInputGroup from '../../component/ImageInputGroup';
import star from '../../image/icon/star.png';
import star_filled from '../../image/icon/star_filled.png';
import close from '../../image/icon/close.png';
import {
  deleteReview,
  getReview,
  postReview,
  putReview,
} from '../../axios/review/Review';

export function Modal(props) {
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

  return (
    <div className="modal">
      <div className="modal-content">
        <form
          onSubmit={e => {
            e.preventDefault();
            const dto = {
              productName: 'Liberty 52_Frame',
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
            value={text}
            required
            maxLength={1000}
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <ImageInputGroup imageUrls={modalInfo.imageUrls} />
          <Button text="등록" />
        </form>
      </div>
    </div>
  );
}

function ReviewContents(props) {
  const reviewContents = props.reviewContents;
  let list = [];
  for (var i = 0; i < reviewContents.length; i++) {
    list.push(<ReviewContent key={i} reviewInfo={reviewContents[i]} />);
  }
  return (
    <div>{list.length > 0 ? list : <span>작성된 구매평이 없습니다.</span>}</div>
  );
}

function ReviewContent(props) {
  const [modal, showModal] = useState(false);
  const reviewInfo = props.reviewInfo;

  const filesChildNode = [];
  reviewInfo.imageUrls.map((imageUrl, index) => {
    filesChildNode.push(
      <Image
        key={index}
        image={imageUrl}
        onClick={e => {
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
      />
    );
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
          <Image
            image={
              reviewInfo.authorProfileUrl === null
                ? ''
                : reviewInfo.authorProfileUrl
            }
          />
          <div className="name">{reviewInfo.authorName}</div>
          <div className="rating">
            <img src={star_filled} />
            <img src={reviewInfo.rating < 2 ? star : star_filled} />
            <img src={reviewInfo.rating < 3 ? star : star_filled} />
            <img src={reviewInfo.rating < 4 ? star : star_filled} />
            <img src={reviewInfo.rating < 5 ? star : star_filled} />
          </div>
        </div>
        {reviewInfo.isYours ? (
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
        ) : (
          <></>
        )}
      </div>
      <div className="content">{reviewInfo.content}</div>
      <div className="files">{filesChildNode}</div>
    </div>
  );
}

function Pages(props) {
  const pages = props.pages;
  const list = [];
  for (var i = pages.startPage; i <= pages.lastPage; i++) {
    if (i === pages.currentPage)
      list.push(
        <span key={i} className="active">
          {i}
        </span>
      );
    else list.push(<span key={i}>{i}</span>);
  }
  return <div className="pages">{list}</div>;
}

export default function Review() {
  const [onlyPhoto, setOnlyPhoto] = useState(false);
  const [reviewContents, setReviewContents] = useState([]);
  const [pages, setPages] = useState({
    startPage: 1,
    lastPage: 1,
    currentPage: 1,
  });

  useEffect(() => {
    getReview('LIB-001', 11, 0, onlyPhoto).then(res => {
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
        };
        setReviewContents(reviewContents => [...reviewContents, reviewInfo]);
      }
      setPages({
        startPage: res.startPage,
        lastPage: res.lastPage,
        currentPage: res.currentPage,
      });
    });
  }, [onlyPhoto]);

  return (
    <div className="review">
      <div className="tab">리뷰</div>
      <div className="title-div">
        <div className="title">구매평 (개수)</div>
      </div>
      <div className="button-div"></div>
      <div className="filter">
        <Checkbox
          text="포토 구매평만 보기"
          onChange={() => {
            setOnlyPhoto(!onlyPhoto);
          }}
        />
      </div>
      <ReviewContents reviewContents={reviewContents} />
      <Pages pages={pages} />
    </div>
  );
}
