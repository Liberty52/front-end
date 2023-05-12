import axios from "axios";


export const retrieveNoticeList = (size,page) => {
  return axios.get(`http://localhost:8080/notices?size=${size}&page=${page}`)
}

export const retrieveNoticeDetail = (noticeId) => {
  return axios.get(`http://localhost:8080/notices/${noticeId}`);
}