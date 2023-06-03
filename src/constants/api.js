export const QUESTION_LIST = (page, pageSize) =>
  `/auth/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION = (id) => `/auth/questions/${id}`;
export const QUESTION_DETAIL = (id) => `/auth/questions/${id}`;
export const CREATE_QUESTION = () => `/auth/questions`;
export const UPDATE_QUESTION = (id) => `/auth/questions/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

export const TOKEN_REFRESH = () => `/auth/refresh`;

export const NOTICE_LIST = (size, page) =>
  `/auth/notices?size=${size}&page=${page}`;
export const NOTICE_DETAIL = (noticeId) => `/auth/notices/${noticeId}`;

<<<<<<< HEAD
export const PRODUCT_INFO = (id) => `/product/products/${id}`;
=======
export const PRODUCT_INFO = () => `/product/products/LIB-001`;
>>>>>>> 5c5afa79ec84d34c95fe90b03c887b2b6109bda1
