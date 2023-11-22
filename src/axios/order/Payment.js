import axios from '../axios';
import { ACCESS_TOKEN, GUEST_COOKIE } from '../../constants/token';
import cookie from 'react-cookies';
import { CONTENT_TYPE } from '../../constants/header';

function checkLicense(dto, file) {
  if ('licenseOptionDetailId' in dto.productDto) {
    file = null;
    console.log(dto, file);
  }
}

export function prepareCard(dto, file) {
  checkLicense(dto, file);
  const formData = new FormData();
  formData.append('imageFile', file);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;

  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return new Promise((res) => {
      axios
        .post('/product/orders/card', formData, {
          headers: {
            'Content-Type': CONTENT_TYPE.MultipartFormData,
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          alert('카드결제 요청에 실패했습니다.');
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post('/product/guest/orders/card', formData, {
          headers: {
            'Content-Type': CONTENT_TYPE.MultipartFormData,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          alert('카드결제 요청에 실패했습니다.');
        });
    });
  }
}

export function prepareCardCart(dto) {
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return new Promise((res) => {
      axios
        .post('/product/orders/card/carts', JSON.stringify(dto), {
          headers: {
            'Content-Type': CONTENT_TYPE.ApplicationJson,
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          alert('카드결제 요청에 실패했습니다.');
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post('/product/guest/orders/card/carts', JSON.stringify(dto), {
          headers: {
            'Content-Type': CONTENT_TYPE.ApplicationJson,
            Authorization: cookie.load(GUEST_COOKIE),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          alert('카드결제 요청에 실패했습니다.');
        });
    });
  }
}

export function checkCardPayApproval(orderId, guestPhoneNum) {
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return axios.get(`/product/orders/card/${orderId}/confirm`, {
      headers: {
        'Content-Type': `application/json`,
        Authorization: sessionStorage.getItem(ACCESS_TOKEN),
      },
    });
  } else {
    return axios.get(`/product/guest/orders/card/${orderId}/confirm`, {
      headers: {
        'Content-Type': CONTENT_TYPE.ApplicationJson,
        Authorization: guestPhoneNum,
      },
    });
  }
}

export function getVBankInfos() {
  return axios.get('/product/vbanks');
}

export function payByVBank(dto, file) {
  checkLicense(dto, file);
  const formData = new FormData();
  formData.append('imageFile', file);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));
  const receiverPhoneNumber = dto.destinationDto.receiverPhoneNumber;
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return new Promise((res) => {
      axios
        .post('/product/orders/vbank', formData, {
          headers: {
            'Content-Type': CONTENT_TYPE.MultipartFormData,
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`,
          );
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post('/product/guest/orders/vbank', formData, {
          headers: {
            'Content-Type': CONTENT_TYPE.MultipartFormData,
            Authorization: receiverPhoneNumber,
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`,
          );
        });
    });
  }
}

export function payByVBankCart(dto) {
  if (sessionStorage.getItem(ACCESS_TOKEN)) {
    return new Promise((res) => {
      axios
        .post('/product/orders/vbank/carts', JSON.stringify(dto), {
          headers: {
            'Content-Type': CONTENT_TYPE.ApplicationJson,
            Authorization: sessionStorage.getItem(ACCESS_TOKEN),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`,
          );
        });
    });
  } else {
    return new Promise((res) => {
      axios
        .post('/product/guest/orders/vbank/carts', JSON.stringify(dto), {
          headers: {
            'Content-Type': CONTENT_TYPE.ApplicationJson,
            Authorization: cookie.load(GUEST_COOKIE),
          },
        })
        .then((response) => {
          res(response.data);
        })
        .catch((e) => {
          const eData = e.response.data;
          alert(
            `가상계좌 결제 요청이 실패하였습니다.\n에러코드: ${eData.errorCode}\n에러메시지:\n${eData.errorMessage}`,
          );
        });
    });
  }
}
