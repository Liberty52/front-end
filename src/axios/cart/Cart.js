import axios from '../axios';
import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, GUEST_COOKIE } from '../../constants/token';
import { CONTENT_TYPE } from '../../constants/header';
import { BACK, CART } from '../../constants/path';
import {
  ADD_CART,
  ADD_CART_GUEST,
  CART_LIST,
  DELETE_CART,
  DELETE_CART_GUEST,
  EDIT_CART,
  EDIT_CART_GUEST,
  PRODUCT_OPTION,
} from '../../constants/api';

export default function post(dto, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    axios
      .post(ADD_CART, formData, {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          'Content-Type': CONTENT_TYPE.MultipartFormData,
        },
      })
      .then(() => {
        alert('장바구니에 담겼습니다!');
        window.location.replace(BACK);
      });
  } else {
    axios
      .post(ADD_CART_GUEST, formData, {
        headers: {
          Authorization: cookie.load(GUEST_COOKIE),
          'Content-Type': CONTENT_TYPE.MultipartFormData,
        },
      })
      .then(() => {
        alert('비회원 장바구니에 담겼습니다!');
        window.location.replace(BACK);
      });
  }
}

export const fetchCartData = (token, setCartList, setEmptyMode, setProductOption) => {
  const headers = {
    Authorization: token,
  };

  axios
    .get(CART_LIST, { headers })
    .then((response) => {
      setCartList(response.data);
      if (!response.data || response.data === '') {
        setEmptyMode(true);
      } else {
        axios.get(PRODUCT_OPTION, { headers }).then((response) => {
          setProductOption(response.data[0].productOptionList);
        });
      }
    })
    .catch((error) => {});
};

export const handleDeleteClick = (checkedList) => {
  if (checkedList == 0) {
    alert('체크된 항목이 없습니다');
  } else {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      if (sessionStorage.getItem(ACCESS_TOKEN)) {
        const customProductId = checkedList.map((id) => {
          axios
            .delete(DELETE_CART(id), {
              headers: {
                Authorization: sessionStorage.getItem(ACCESS_TOKEN),
              },
            })
            .then(() => {
              window.location.replace(CART);
            });
        });
      } else {
        const customProductId = checkedList.map((id) => {
          axios
            .delete(DELETE_CART_GUEST(id), {
              headers: {
                Authorization: cookie.load(GUEST_COOKIE),
              },
            })
            .then(() => {
              window.location.replace(CART);
            });
        });
      }
    }
  }
};

export const handleEditClick = (customProductId, dto, file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    axios
      .patch(EDIT_CART(customProductId), formData, {
        headers: {
          Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          'Content-Type': CONTENT_TYPE.MultipartFormData,
        },
      })
      .then(() => {
        window.location.replace(CART);
      });
  } else {
    axios
      .patch(EDIT_CART_GUEST(customProductId), formData, {
        headers: {
          Authorization: cookie.load(GUEST_COOKIE),
          'Content-Type': CONTENT_TYPE.MultipartFormData,
        },
      })
      .then(() => {
        window.location.replace(CART);
      });
  }
};
