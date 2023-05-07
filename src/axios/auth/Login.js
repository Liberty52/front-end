import axios from '../axios';

export default function post(dto, checked) {
  axios
    .post('/auth/login', JSON.stringify(dto), {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then(response => {
      alert(response.data.name + '님 환영합니다!');
      if (checked) {
        localStorage.setItem('REFRESH_TOKEN', response.headers.refresh);
      }
      localStorage.setItem('ACCESS_TOKEN', response.headers.access);
      window.location.replace('/');
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === 401) alert('로그인 실패.');
      }
    });
}

export function findEmail(name, phoneNumber) {
  const requestBody = {
    name: name,
    phoneNumber: phoneNumber,
  };

  return axios.post('/auth/find-email', requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    console.log('서버에서 받은 응답:', response);
    console.log('서버에서 받은 응답 값:', response.data);
    return response;
  })
    .catch(error => {
      console.error('서버에서 에러 발생:', error);
      throw error;
    });
}


export function sendPasswordResetEmail(email) {
  const data = {
    email: email,
  };
  console.log(email);
  return axios.post('/auth/password/send-mail', data, {
    headers: {
      'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
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
