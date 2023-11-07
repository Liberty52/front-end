export const QUESTION_LIST = (page, pageSize) => `/auth/questions?page=${page}&size=${pageSize}`;
export const DELETE_QUESTION = (id) => `/auth/questions/${id}`;
export const QUESTION_DETAIL = (id) => `/auth/questions/${id}`;
export const CREATE_QUESTION = () => `/auth/questions`;
export const UPDATE_QUESTION = (id) => `/auth/questions/${id}`;
export const UPLOAD_IMAGE = () => `/auth/questions/img`;

export const TOKEN_REFRESH = () => `/auth/refresh`;

export const NOTICE_LIST = (size, page) => `/auth/notices?size=${size}&page=${page}`;
export const NOTICE_DETAIL = (noticeId) => `/auth/notices/${noticeId}`;

// order api
export const PRODUCT_INFO = (id) => `/product/products/${id}`;
export const LICENSE_IMAGES = (productId) => `/product/licenseProductOptionInfo/${productId}`;

export const CREATE_REVIEW = () => `/product/reviews`;

export const LICENSE_LIST = () => `/product/licenseImage`;

// cart api
export const ADD_CART = () => '/product/carts/custom-products';
export const ADD_CART_GUEST = () => '/product/guest/carts/custom-products';
export const CART_LIST = () => '/product/carts';
export const PRODUCT_OPTION = () => '/product/carts/productOptionInfo';
export const DELETE_CART = (id) => `/product/carts/custom-products/${id}`;
export const DELETE_CART_GUEST = (id) => `/product/guest/carts/custom-products/${id}`;
export const EDIT_CART = (id) => `/product/carts/customProducts/${id}`;
export const EDIT_CART_GUEST = (id) => `/product/guest/carts/customProducts/${id}`;
