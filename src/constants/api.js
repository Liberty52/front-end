export const QUESTION_LIST = (page, pageSize) => `/auth/questions?page=${page}&size=${pageSize}`
export const DELETE_QUESTION = (id) => `/auth/questions/${id}`;
export const QUESTION_DETAIL = (id) => `/auth/questions/${id}`;
export const CREATE_QUESTION = () => `/auth/questions`;
export const UPDATE_QUESTION = (id) => `/auth/questions/${id}`;
export const UPLOAD_IMAGE = ()=>`/auth/questions/img`;