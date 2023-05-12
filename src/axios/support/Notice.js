import request from "../axios";
import { NOTICE_DETAIL, NOTICE_LIST } from "../../constants/api";


export const retrieveNoticeList = (size,page) => {
  return request.get(NOTICE_LIST(size,page))
}

export const retrieveNoticeDetail = (noticeId) => {
  return request.get(NOTICE_DETAIL(noticeId));
}