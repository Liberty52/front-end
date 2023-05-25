import axios from "../axios";
import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants/token";

export default function post(dto, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  if ( sessionStorage.getItem(ACCESS_TOKEN)) {
    axios
      .post("/product/carts/custom-products", formData, {
        headers: {
          Authorization:  sessionStorage.getItem(ACCESS_TOKEN),
          "Contest-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("장바구니에 담겼습니다!");
        window.location.replace("/");
      });
  } else {
    axios
      .post("/product/guest/carts/custom-products", formData, {
        headers: {
          Authorization: cookie.load("guest"),
          "Contest-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("비회원 장바구니에 담겼습니다!");
        window.location.replace("/");
      });
  }
}

export function GetCartList() {
  const navigate = useNavigate();
  const [data, setCartList] = useState([]);
  if ( sessionStorage.getItem(ACCESS_TOKEN)) {
    axios
      .get("https://liberty52.com:444/product/carts", {
        headers: {
          Authorization:  sessionStorage.getItem(ACCESS_TOKEN),
        },
      })
      .then((response) => {
        setCartList(response.data);
        if (!response.data || response.data == "") {
          alert("장바구니에 담긴 상품이 없습니다.");
          return navigate("/");
        }
      });
  } else {
    axios
      .get("https://liberty52.com:444/product/guest/carts", {
        headers: {
          Authorization: cookie.load("guest"),
        },
      })
      .then((response) => {
        setCartList(response.data);
        if (!response.data || response.data == "") {
          alert("장바구니에 담긴 상품이 없습니다.");
          return navigate("/");
        }
      });
  }
  //  else {
  //   alert("잘못된 접근입니다");
  //   return navigate("/");
  // }
  return data;
}

export const handleDeleteClick = (checkedList) => {
  
  if (checkedList == 0) {
    alert("체크된 항목이 없습니다");
  } else {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      if ( sessionStorage.getItem(ACCESS_TOKEN)) {
        const customProductId = checkedList.map((id) => {
          axios
            .delete(
              `https://liberty52.com:444/product/carts/custom-products/${id}`,
              {
                headers: {
                  Authorization:  sessionStorage.getItem(ACCESS_TOKEN),
                },
              }
            )
            .then(() => {
              window.location.replace("/cart");
            });
        });
      } else {
        const customProductId = checkedList.map((id) => {
          axios
            .delete(
              `https://liberty52.com:444/product/guest/carts/custom-products/${id}`,
              {
                headers: {
                  Authorization: cookie.load("guest"),
                },
              }
            )
            .then(() => {
              window.location.replace("/cart");
            });
        });
      }
    }
  }
};

export const handleEditClick = (customProductId, dto, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );
  console.log(dto, file);
  
  if ( sessionStorage.getItem(ACCESS_TOKEN)) {
    axios
      .patch(
        `https://liberty52.com:444/product/carts/custom-products/${customProductId}`,
        formData,
        {
          headers: {
            Authorization:  sessionStorage.getItem(ACCESS_TOKEN),
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        window.location.replace("/cart");
      });
  } else {
    axios
      .patch(
        `https://liberty52.com:444/product/guest/carts/custom-products/${customProductId}`,
        formData,
        {
          headers: {
            Authorization: cookie.load("guest"),
            "Contest-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        window.location.replace("/cart");
      });
  }
};
