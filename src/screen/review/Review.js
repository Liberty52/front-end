import './Review.css';
import React, { useState, useEffect } from 'react';
import Checkbox from '../../component/Checkbox';
import Image from '../../component/Image';
import ImageInput from '../../component/ImageInput';
import Modal from '../../component/Modal';
import Button from '../../component/Button';
import star from '../../image/icon/star.png';
import star_filled from '../../image/icon/star_filled.png';
import {
  deleteReview,
  getReview,
  postReview,
  putReview,
} from '../../axios/review/Review';

export function ReviewModal(props) {
  const modalInfo =
    props.reviewInfo === undefined
      ? {
          rating: 1,
          imageUrls: ['', '', ''],
          content: '',
        }
      : props.reviewInfo;
  const [rating, setRating] = useState(modalInfo.rating);
  const [text, setText] = useState(modalInfo.content);

  return (
    <Modal title="리뷰 작성" closeModal={props.closeModal}>
      <form
        onSubmit={e => {
          e.preventDefault();
          const dto = {
            productName: 'Liberty 52_Frame',
            rating: rating,
            content: e.target.content.value,
            orderId: 'GORDER-001',
          };
          if (props.reviewInfo === undefined) {
            postReview(dto, e.target.file);
          } else putReview(dto, e.target.file, modalInfo.reviewId);
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
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <div className="images">
          <ImageInput imgFile={modalInfo.imageUrls[0]} />
          <ImageInput imgFile={modalInfo.imageUrls[1]} />
          <ImageInput imgFile={modalInfo.imageUrls[2]} />
        </div>
        <Button text="등록" />
      </form>
    </Modal>
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
  reviewInfo.imageUrls.map(imageUrl => {
    filesChildNode.push(<Image image={imageUrl} />);
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
  const [modal, showModal] = useState(false);
  const [onlyPhoto, setOnlyPhoto] = useState(false);
  const [reviewContents, setReviewContents] = useState([]);
  const [pages, setPages] = useState({
    startPage: 1,
    lastPage: 1,
    currentPage: 1,
  });

  useEffect(() => {
    getReview('LIB-001', 5, 1, onlyPhoto).then(res => {
      const contents = res.contents;
      setReviewContents([]);
      setPages({
        startPage: res.startPage,
        lastPage: res.lastPage,
        currentPage: res.currentPage,
      });
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
        setReviewContents([...reviewContents, reviewInfo]);
      }
    });
  }, [onlyPhoto]);

  return (
    <div className="review">
      {modal ? <Modal closeModal={() => showModal(false)} /> : <></>}
      <div className="tab">리뷰</div>
      <div className="title-div">
        <div className="title">구매평 (개수)</div>
        <Button text="구매평 쓰기" onClick={() => showModal(true)} />
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
