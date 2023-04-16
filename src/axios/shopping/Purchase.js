import axios from '../axios';
import Select from 'react-select';

export default function post(dto) {
  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  axios
    .post("/product/cart-items", formData, {
      headers: {
        "Contest-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alert("장바구니에 담겼습니다");
      window.location.replace("/");
    });
}
