import axios from '../axios';
import cookie from 'react-cookies';
import { ACCESS_TOKEN, GUEST_COOKIE } from '../../constants/token';
import { CONTENT_TYPE } from '../../constants/header';
import { BACK, CART } from '../../constants/path';
import {
  ADD_CART_CUSTOM,
  ADD_CART_CUSTOM_GUEST,
  ADD_CART_LICENSE,
  CART_LIST,
  DELETE_CART,
  DELETE_CART_GUEST,
  EDIT_CART,
  EDIT_CART_GUEST,
  PRODUCT_OPTION,
} from '../../constants/api';
import Swal from "sweetalert2";

export default function post(dto, file, isCustom) {
  const formData = new FormData();
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));

    function alertSuccess() {
        Swal.fire({
            title: '장바구니에 담겼습니다',
            icon: 'success',
        });
    }

    if (sessionStorage.getItem(ACCESS_TOKEN)) {
    if (isCustom) {
      formData.append('file', file);
      axios
          .post(ADD_CART_CUSTOM(), formData, {
            headers: {
              Authorization: sessionStorage.getItem(ACCESS_TOKEN),
              "Content-Type": CONTENT_TYPE.MultipartFormData,
            },
          })
          .then(() => {
            alertSuccess();
          });
    }
    if (!isCustom) {
      axios
          .post(ADD_CART_LICENSE(), formData, {
            headers: {
              Authorization: sessionStorage.getItem(ACCESS_TOKEN),
              "Content-Type": CONTENT_TYPE.MultipartFormData,
            },
          })
          .then(() => {
              alertSuccess();
          });
    }
  } else {
    axios
      .post(ADD_CART_CUSTOM_GUEST(), formData, {
        headers: {
          Authorization: cookie.load(GUEST_COOKIE),
          'Content-Type': CONTENT_TYPE.MultipartFormData,
        },
      })
        .then(() => {
          Swal.fire({
            title: '비회원 장바구니에 담겼습니다',
            icon: 'success',
          });
        });
  }
}

export const fetchCartData = (token, setCartList, setEmptyMode, setProductOption) => {
  const headers = {
    Authorization: token,
  };

  axios
    .get(CART_LIST(), { headers })
    .then((response) => {
      setCartList(response.data);
      if (!response.data || response.data === '') {
        setEmptyMode(true);
      } else {
        axios.get(PRODUCT_OPTION(), { headers }).then((response) => {
          setProductOption(response.data[0].productOptionList);
        });
      }
    })
    .catch((error) => {});
};

export const handleDeleteClick = (checkedList) => {
  if (checkedList === 0) {
    alert('체크된 항목이 없습니다');
  } else {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      if (sessionStorage.getItem(ACCESS_TOKEN)) {
        checkedList.map((id) => {
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
        checkedList.map((id) => {
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
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
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
