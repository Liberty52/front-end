import request from "../axios";
import {
  NOTICE_DETAIL,
  NOTICE_LIST,
  POST_NOTICE_COMMENT,
} from "../../constants/api";
import { ACCESS_TOKEN } from "../../constants/token";
import { CONTENT_TYPE } from "../../constants/header";

export const retrieveNoticeList = (size, page) => {
  return request.get(NOTICE_LIST(size, page));
};

export const retrieveNoticeDetail = (noticeId) => {
  return request.get(NOTICE_DETAIL(noticeId));
};

export const retrieveComments = (noticeId) => {
  alert("아직 안 했지롱");
  // return request.get()
};

export const postComment = (noticeId, content) => {
  const data = { content: content };
  return request.post(POST_NOTICE_COMMENT(noticeId), data, {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type": CONTENT_TYPE.ApplicationJson,
    },
  });
};
