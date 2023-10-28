import axios from '../axios';
import request from '../axios';
import { ACCESS_TOKEN } from '../../constants/token';
import { PRODUCT_INFO, PRODUCT_LIST } from '../../constants/api';

export const getProductInfo = async (id) => {
  return request.get(PRODUCT_INFO(id), {
    headers: {
      Authorization: sessionStorage.getItem(ACCESS_TOKEN),
    },
  });
};

//https://liberty52.com:444/products?page=0&size=10
export function getProductList(page, size) {
  return new Promise((res) => {
    axios
      .get(`/product/products?page=${page}&size=${size}`, {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
        },
      })
      .then((response) => {
        res(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  });
}
