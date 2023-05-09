
import { DELETE_QUESTION, QUESTION_DETAIL } from "../../constants/api";

import request from "../axios";
import { ACCESS_TOKEN } from "../../constants/token";

export const getQuestionDetail = async (id) => {
    return request.get(QUESTION_DETAIL(id), {
      headers: {
        "Authorization":  sessionStorage.getItem(ACCESS_TOKEN)
      }
    })
}

export const deleteQuestion = (id) => {
  return request.delete(DELETE_QUESTION(id), {
    headers: {
      "Authorization":  sessionStorage.getItem(ACCESS_TOKEN)
    }
  })
}