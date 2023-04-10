import axios from '../axios';

export default function getMyInfo() {
  return new Promise(res => {
    axios
      .get('/auth/my', {
        headers: {
          Authorization: localStorage.getItem('ACCESS_TOKEN'),
        },
      })
      .then(response => {
        const info = {
          profileUrl: response.data.profileUrl,
          email: response.data.email,
          name: response.data.name,
          phoneNumber: response.data.phoneNumber,
        };
        res(info);
      })
      .catch(e => {
        alert('정보를 가져오는데 실패했습니다.');
      });
  });
}
