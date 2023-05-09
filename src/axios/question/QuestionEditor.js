import axios from "axios";
import { CREATE_QUESTION, UPDATE_QUESTION, UPLOAD_IMAGE } from "../../constants/api";
import { Authorization, CONTENT_TYPE, HEADER } from "../../constants/header";
import request from "../axios";
import { ACCESS_TOKEN } from "../../constants/token";


export const createQuestion = (data, next) => {

  request.post(CREATE_QUESTION(),data,{
    headers : {
      Authorization :  sessionStorage.getItem(ACCESS_TOKEN)
    }
  })
    .then(res => {
        next();
    }).catch(err => console.error(err));
}


export const updateQuestion = (data, next, id) => {

  request.put(UPDATE_QUESTION(id),data,{
    headers : {
      Authorization :  sessionStorage.getItem(ACCESS_TOKEN)
    }
  })
    .then(res => {
      next();
    }).catch(err => console.error(err));
}

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file",file);
  return request.post(UPLOAD_IMAGE(),formData,{
    headers : {
      Authorization :  sessionStorage.getItem(ACCESS_TOKEN),
      "Content-Type" : CONTENT_TYPE.MultipartFormData
    }
  })
}