
import { QUESTION_LIST } from "../../constants/api";
import request from "../axios";
import { ACCESS_TOKEN } from "../../constants/token";



export const getQuestionList = async (page,pageSize) => {
  return request.get(QUESTION_LIST(page,pageSize),{
    headers : {
      "Authorization":  sessionStorage.getItem(ACCESS_TOKEN)
    }
  });
}