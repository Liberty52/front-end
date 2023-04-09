import axios from 'axios';

export default function post(dto, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'dto',
    new Blob([JSON.stringify(dto)], { type: 'application/json' })
  );
  axios
    .post('http://localhost:8080/auth/sign-up', formData, {
      headers: {
        'Contest-Type': 'multipart/form-data',
      },
    })
    .then(() => {
      alert(dto.name + '님 회원 가입을 환영합니다.');
      window.location.replace('/login');
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status === 400)
          alert(dto.email + '은 사용할 수 없는 이메일입니다.');
      }
    });
}
