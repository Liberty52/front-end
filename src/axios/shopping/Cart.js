import axios from "../axios";
import React, { useState, useEffect } from "react";

export default function post(dto, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  axios
    .post("/product/carts/custom-products", formData, {
      headers: {
        Authorization: localStorage.getItem("ACCESS_TOKEN"),
        "Contest-Type": "multipart/form-data",
      },
    })
    .then(() => {
      alert("장바구니에 담겼습니다!");
      window.location.replace("/");
    });
}

export function GetCartList() {
  const [data, setCartList] = useState([]);
  axios
    .get("https://liberty52.com:444/product/carts", {
      headers: {
        Authorization: localStorage.getItem("ACCESS_TOKEN"),
      },
    })
    .then((response) => {
      setCartList(response.data);
    });
  return data;
}
