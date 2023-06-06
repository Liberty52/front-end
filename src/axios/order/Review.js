import axios from "../axios";
import { ACCESS_TOKEN } from "../../constants/token";
import { CREATE_REVIEW } from "../../constants/api";

export function postReview(dto, files) {
  const formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    if (files[i] !== undefined) formData.append("images", files[i]);
  }

  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  axios
    .post(CREATE_REVIEW(), formData, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alert("성공적으로 리뷰를 작성하셨습니다.");
    })
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 404)
          alert("주문 또는 제품이 존재하지 않습니다");
      }
    });
}

export function getReview(productId, size, page, photoFilter) {
  return new Promise((res) => {
    axios
      .get(
        `/product/reviews/products/${productId}?size=${size}&page=${page}&photoFilter=${photoFilter}`,
        {
          headers: {
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        }
      )
      .then((response) => {
        res(response.data);
      })
      .catch((e) => console.error(e));
  });
}

/**
 * 리뷰 수정(별점, 내용)
 */
export function patchContents(reviewId, dto) {
  return axios.patch(`/product/reviews/${reviewId}`, JSON.stringify(dto), {
    headers: {
      Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
      "Content-Type": "application/json",
    },
  });
}

/**
 * 리뷰 수정(이미지 추가)
 * @param files 추가할 이미지 파일들 : File[]
 */
export function postImage(reviewId, files) {
  const formData = new FormData();
  for (var i = 0; i < files.length; i++) {
    if (files[i] !== undefined) formData.append("images", files[i]);
  }
  axios
    .post(`/product/reviews/${reviewId}/images`, formData, {
      headers: {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => {
      return true;
    })
    .catch((response) => {
      if (response.status === 400)
        console.error("추가할 이미지에 문제가 있습니다.");
      else if (response.status === 403)
        console.error("당신의 리뷰가 아닙니다.");
      else if (response.status === 404)
        console.error("해당 리뷰가 존재하지 않습니다.");
    });
  return false;
}

/**
 * 리뷰 수정(이미지 제거)
 * @param urls 제거할 이미지 Url들 : String[]
 */
export function delImage(reviewId, dto) {
  axios
    .delete(`/product/reviews/${reviewId}/images`, {
      data: JSON.stringify(dto),
      headers: {
        Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      return true;
    })
    .catch((response) => {
      if (response.status === 400)
        console.error("제거할 이미지에 문제가 있습니다.");
      else if (response.status === 403)
        console.error("당신의 리뷰가 아닙니다.");
      else if (response.status === 404)
        console.error("해당 리뷰가 존재하지 않습니다.");
    });
  return false;
}

export function deleteReview(reviewId, onSuccess) {
  if (window.confirm("리뷰를 삭제하시겠습니까?")) {
    axios
      .delete(`/product/reviews/${reviewId}`, {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        },
      })
      .then(() => {
        alert("리뷰가 삭제되었습니다.");
        onSuccess();
      })
      .catch((response) => {
        if (response.status === 404) alert("해당 리뷰가 존재하지 않습니다.");
      });
  }
}
