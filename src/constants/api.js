export const QUESTION_LIST = (page, pageSize) => `/product/questions?page=${page}&size=${pageSize}`
export const DELETE_QUESTION = (id) => `/product/questions/${id}`;
export const QUESTION_DETAIL = (id) => `/product/questions/${id}`;
export const CREATE_QUESTION = () => `/product/questions`;
export const UPDATE_QUESTION = (id) => `/product/questions/${id}`;
export const UPLOAD_IMAGE = ()=>`/product/questions/img`;