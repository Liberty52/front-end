import axios from '../axios';
import { CONTENT_TYPE } from '../../constants/header';
import { LOGIN } from '../../constants/path';

export default function post(dto, file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dto', new Blob([JSON.stringify(dto)], { type: CONTENT_TYPE.ApplicationJson }));
  axios
    .post('/auth/sign-up', formData, {
      headers: {
        'Content-Type': CONTENT_TYPE.MultipartFormData,
      },
    })
    .then(() => {
      alert(dto.name + '님 회원 가입을 환영합니다.');
      window.location.replace(LOGIN);
    })
    .catch((e) => {
      if (e.response) {
        if (e.response.status === 400) alert(dto.email + '은 사용할 수 없는 이메일입니다.');
      }
    });
}
