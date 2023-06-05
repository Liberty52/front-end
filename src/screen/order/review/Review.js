/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import "./Review.css";
import React, { useState, useEffect } from "react";
import Checkbox from "../../../component/common/Checkbox";
import Image from "../../../component/common/Image";
import ReviewModal from "../../../component/order/review/ReviewModal";
import star from "../../../image/icon/star.png";
import star_filled from "../../../image/icon/star_filled.png";
import { deleteReview, getReview } from "../../../axios/order/Review";

export default function Review() {
  function ReviewContents() {
    let list = [];
    for (var i = 0; i < reviewContents.length; i++) {
      list.push(<ReviewContent key={i} reviewInfo={reviewContents[i]} />);
    }
    return (
      <div>
        {list.length > 0 ? list : <span>작성된 구매평이 없습니다.</span>}
      </div>
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
          onClick={(e) => {
            const img = e.target;
            const imageCrop = img.parentNode;
            if (imageCrop.style.width === "auto") {
              imageCrop.style.width = "100px";
              imageCrop.style.height = "100px";
              img.style.width = "100%";
            } else {
              imageCrop.style.width = "auto";
              imageCrop.style.height = "auto";
              img.style.width = "300px";
            }
          }}
        />
      );
    });

    return (
      <div className="review-content">
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
        <div className="review-header">
          <div className="user">
            <Image
              image={
                reviewInfo.authorProfileUrl === null
                  ? ""
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
        <div className="reply">
          {reviewInfo.replies.map((reply) => {
            return (
              <div key={reply.replyId}>
                {reply.authorName} <br />
                {reply.content}
              </div>
            );
          })}
        </div>
        <div className="files">{filesChildNode}</div>
      </div>
    );
  }

  function Pages(props) {
    const pages = props.pages;
    const list = [];
    for (let i = pages.startPage; i <= pages.lastPage; i++) {
      if (i === pages.currentPage)
        list.push(
          <span key={i} className="active" onClick={() => {setPageNum(i-1)}}>
            {i}
          </span>
        );
      else list.push(<span key={i} onClick={() => {setPageNum(i-1)}}>{i}</span>);
    }
    return <div className="pages">{list}</div>;
  }
  const [onlyPhoto, setOnlyPhoto] = useState(false);
  const [reviewContents, setReviewContents] = useState([]);
  const [pages, setPages] = useState({
    startPage: 1,
    lastPage: 1,
    currentPage: 1,
  });
  const [pageNum,setPageNum] = useState(0);

  function getReviewFromServer() {
    getReview("LIB-001", 10, pageNum, onlyPhoto).then((res) => {
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

  useEffect(() => {
    getReviewFromServer();
  }, [onlyPhoto,pageNum]);

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
