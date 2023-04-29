
import { QUESTION_LIST } from "../../constants/api";
import request from "../axios";



export const getQuestionList = async (page,pageSize) => {
  return request.get(QUESTION_LIST(page,pageSize),{
    headers : {
      "Authorization": localStorage.getItem("ACCESS_TOKEN")
    }
  });
}