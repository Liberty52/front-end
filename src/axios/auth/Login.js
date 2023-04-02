import axios from 'axios';

export default function post(dto) {
  axios
    .post('http://13.125.49.218:8080/auth/login', JSON.stringify(dto), {
      headers: {
        'Content-Type': `application/json`,
      },
    })
    .then(response => {
      alert(response.data.name + '님 환영합니다!');
      console.log(response.data.profileUser); // undefined(null)
      console.log(response.data.role); // USER
      // 회원 정보 세션 저장
      window.location.replace('/');
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === 401) alert('로그인 실패.');
      }
    });
}
