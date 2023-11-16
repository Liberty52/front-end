import axios from '../axios';
import { REFRESH_TOKEN } from '../../constants/token';
import request from '../axios';
import { TOKEN_REFRESH } from '../../constants/api';
import { CONTENT_TYPE } from '../../constants/header';

export function post(dto) {
  return axios.post('/auth/login', JSON.stringify(dto), {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
}

export function findEmail(name, phoneNumber) {
  const requestBody = {
    name: name,
    phoneNumber: phoneNumber,
  };

  return axios
    .post('/auth/find-email', requestBody, {
      headers: {
        'Content-Type': CONTENT_TYPE.ApplicationJson,
      },
    })
    .then((response) => {
      return response;
    })

    .catch((error) => {
      console.error('서버에서 에러 발생:', error);
      throw error;
    });
}

export function sendPasswordResetEmail(email) {
  const data = {
    email: email,
  };

  return axios.post('/auth/password/send-mail', data, {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
}

export function resetPassword(emailToken, password) {
  const data = {
    emailToken: emailToken,
    password: password,
  };
  return axios.patch('/auth/password', data, {
    headers: {
      'Content-Type': CONTENT_TYPE.ApplicationJson,
    },
  });
}

///////////////////////
export async function fetchOrderDetails(orderId, accessToken, phoneNumber) {
  try {
    const headers = {};
    if (accessToken) {
      headers.Authorization = `${accessToken}`;
    } else if (phoneNumber) {
      headers.Authorization = `${phoneNumber}`;
    }

    const url = `/product/${accessToken ? 'orders' : 'guest/orders'}/${orderId}`;
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}
export function refreshToken() {
  return request.get(TOKEN_REFRESH(), {
    headers: {
      'LB-RefreshToken': localStorage.getItem(REFRESH_TOKEN),
    },
  });
}
