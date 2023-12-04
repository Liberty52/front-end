export const QUESTION_LIST = (page, pageSize) => `/auth/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION = (id) => `/auth/questions/${id}`;
export const QUESTION_DETAIL = (id) => `/auth/questions/${id}`;
export const CREATE_QUESTION = () => `/auth/questions`;
export const UPDATE_QUESTION = (id) => `/auth/questions/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

export const TOKEN_REFRESH = () => `/auth/refresh`;

export const NOTICE_LIST = (size, page) => `/auth/notices?size=${size}&page=${page}`;
export const NOTICE_DETAIL = (noticeId) => `/auth/notices/${noticeId}`;
export const GET_NOTICE_COMMENT = (noticeId, page, size, sortBy, sort) =>
  `/auth/notices/${noticeId}/comments?page=${page}&size=${size}&sort=${sortBy},${sort}`;
export const POST_NOTICE_COMMENT = (noticeId) => `/auth/notices/${noticeId}/comments`;
export const PATCH_NOTICE_COMMENT = (noticeId, commentId) =>
  `/auth/notices/${noticeId}/comments/${commentId}`;
export const DELETE_NOTICE_COMMENT = (noticeId, commentId) =>
  `/auth/notices/${noticeId}/comments/${commentId}`;

// order api
export const PRODUCT_INFO = (id) => `/product/products/${id}`;
export const LICENSE_IMAGES = (productId) => `/product/licenseProductOptionInfo/${productId}`;

// review api
export const CREATE_REVIEW = () => `/product/reviews`;
export const DELETE_REVIEW = (reviewId) => `/product/reviews/${reviewId}`;

export const SAMPLE_LIST = () => `/product/licenseImage`;

// cart api
export const ADD_CART_CUSTOM = () => '/product/carts/custom-products';
export const ADD_CART_LICENSE = () => '/product/carts/license-products';
export const ADD_CART_CUSTOM_GUEST = () => '/product/guest/carts/custom-products';
export const ADD_CART_LICENSE_GUEST = () => '/product/guest/carts/license-products';
export const CART_LIST = () => '/product/carts';
export const PRODUCT_OPTION = () => '/product/carts/productOptionInfo';
export const DELETE_CART = (id) => `/product/carts/custom-products/${id}`;
export const DELETE_CART_GUEST = (id) => `/product/guest/carts/custom-products/${id}`;
export const EDIT_CART = (id) => `/product/carts/custom-products/${id}`;
export const EDIT_CART_GUEST = (id) => `/product/guest/carts/custom-products/${id}`;
export const EDIT_CART_IMAGE = (id) => `/product/carts/custom-products/image/${id}`;
