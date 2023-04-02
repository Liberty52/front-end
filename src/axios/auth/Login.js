import axios from 'axios';

export default function post(dto, checked) {
  axios
    .post('http://13.125.49.218:8080/auth/login', JSON.stringify(dto), {
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
