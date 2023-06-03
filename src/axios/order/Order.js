import request from "../axios";
import { ACCESS_TOKEN } from "../../constants/token";
import { PRODUCT_INFO } from "../../constants/api";

export const getProductInfo = async () => {
  return request.get(PRODUCT_INFO(), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};
