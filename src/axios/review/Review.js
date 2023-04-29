import axios from "../axios";

export function postReview(dto, file) {
  const formData = new FormData();
  // const files = [];
  // for (var i = 0; i < file.length; i++) {
  //   if (file[i].files[0] !== undefined) files.push(file[i].files[0]);
  // }
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "applcation/json" })
  );
  /* key 확인하기 */
  for (let key of formData.keys()) {
    console.log(key);
  }

  /* value 확인하기 */
  for (let value of formData.values()) {
    console.log(value);
  }
  axios
    .post(`/product/reviews`, formData, {
      headers: {
        Authorization: localStorage.getItem("ACCESS_TOKEN"),
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
            Authorization: localStorage.getItem("ACCESS_TOKEN"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        res(response.data);
      })
      .catch((e) => console.log(e));
  });
}

export function putReview(dto, file, reviewId) {
  const formData = new FormData();
  const files = [];
  for (var i = 0; i < file.length; i++) {
    if (file[i].files[0] !== undefined) files.push(file[i].files[0]);
  }
  formData.append("file", files);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "applcation/json" })
  );
  axios
    .put(`/reviews/${reviewId}`, formData, {
      Authorization: localStorage.getItem("ACCESS_TOKEN"),
      "Content-Type": "multipart/form-data",
    })
    .then((response) => {
      alert("수정되었습니다.");
    })
    .catch((response) => {
      if (response.status === 400) alert("별점 또는 리뷰평에 문제가 있습니다.");
      else if (response.status === 403) alert("당신의 리뷰가 아닙니다.");
      else if (response.status === 404) alert("해당 리뷰가 존재하지 않습니다.");
    });
}

// export function putAddImg(dto, reviewId) {
//   axios
//     .post(`/reviews/${reviewId}/images`, JSON.stringify(dto), {
//       Authorization: localStorage.getItem("ACCESS_TOKEN"),
//     })
//     .then()
//     .catch((response) => {
//       if (response.status === 400) alert("별점 또는 리뷰평에 문제가 있습니다.");
//       else if (response.status === 403) alert("당신의 리뷰가 아닙니다.");
//       else if (response.status === 404) alert("해당 리뷰가 존재하지 않습니다.");
//     });
// }

// export function putDeleteImg(dto, reviewId) {
//   axios.delete(`/reviews/${reviewId}/images`, JSON.stringify(dto), {
//     Authorization: localStorage.getItem("ACCESS_TOKEN"),
//   });
// }

export function deleteReview(reviewId) {
  if (window.confirm("리뷰를 삭제하시겠습니까?")) {
    axios
      .delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: localStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then(alert("리뷰가 삭제되었습니다."))
      .catch((response) => {
        if (response.status === 404) alert("해당 리뷰가 존재하지 않습니다.");
      });
  }
}
