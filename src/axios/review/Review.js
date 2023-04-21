import axios from '../axios';

export function postReview(dto, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'dto',
    new Blob([JSON.stringify(dto)], { type: 'applcation/json' })
  );
  axios
    .post('/reviews', formData, {
      headers: {
        Authorization: localStorage.getItem('ACCESS_TOKEN'),
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response);
      alert('성공적으로 리뷰를 작성하겼습니다.');
    })
    .catch(e => {
      if (e.reponsonse.status === 404)
        alert('주문 또는 제품이 존재하지 않습니다');
    });
}

export function getReview(productId, size, page, photoFilter) {
  axios
    .get(
      `/product/reviews/products/${productId}?size=${size}&page=${page}&photoFilter=${photoFilter}`,
      {
        headers: {
          Authorization: localStorage.getItem('ACCESS_TOKEN'),
        },
      }
    )
    .then(response => {
      console.log(response.data);
    });
}
