import axios from '../axios';

export default function del(memberId) {
  if (window.confirm('정말로 탈퇴하시겠습니까?')) {
    axios
      .delete(`/auth/member`, {
        headers: {
          Authorization: localStorage.getItem('ACCESS_TOKEN'),
        },
      })
      .then(() => {
        localStorage.clear();
        alert('탈퇴가 성공적으로 이루어졌습니다.');
        // navigate("/");
      })
      .catch(err => alert(err.response.data.message));
  }
}
