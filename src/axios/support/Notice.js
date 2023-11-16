import request from '../axios';
import {
  NOTICE_DETAIL,
  NOTICE_LIST,
  GET_NOTICE_COMMENT,
  POST_NOTICE_COMMENT,
  PATCH_NOTICE_COMMENT,
} from '../../constants/api';
import { ACCESS_TOKEN } from '../../constants/token';
import { CONTENT_TYPE } from '../../constants/header';

export const retrieveNoticeList = (size, page) => {
  return request.get(NOTICE_LIST(size, page));
};

export const retrieveNoticeDetail = (noticeId) => {
  return request.get(NOTICE_DETAIL(noticeId));
};

export const retrieveComments = (noticeId, page, logined) => {
  const headers = logined
    ? {
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      }
    : {};
  return request.get(GET_NOTICE_COMMENT(noticeId, page - 1, 10, 'createdAt', 'desc'), { headers });
};

export const postComment = (noticeId, content) => {
  const data = { content: content };
  return request.post(POST_NOTICE_COMMENT(noticeId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};

export const patchComment = (noticeId, commentId, content) => {
  const data = { content: content };
  return request.patch(PATCH_NOTICE_COMMENT(noticeId, commentId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
};