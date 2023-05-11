import "./Header.css";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/token";
import logo from "../image/Logo.svg";

export default function Header() {
  const headerItemsLeft = [
    { name: "제품소개", href: "#" },
    { name: "사업소개", href: "#" },
    { name: "지점소개(쇼룸)", href: "#" },
  ];

  const headerLeft = [];
  for (let i in headerItemsLeft) {
    let headerItem = headerItemsLeft[i];
    headerLeft.push(
      <li key={headerItem.name}>
        <a href={"/" + headerItem.href}>{headerItem.name}</a>
      </li>
    );
  }

  const [headerItemsRight, setHeaderItemsRight] = useState();

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      setHeaderItemsRight([
        { name: "문의하기", href: "question" },
        { name: "내정보", href: "myInfo" },
        {
          name: "로그아웃",
          onClick: () => {
            if (window.confirm("로그아웃하시겠습니까?")) {
              sessionStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(REFRESH_TOKEN);
              window.location.href = "/";
            }
          },
        },
        { name: "장바구니", href: "cart" },
        { name: "주문조회", href: "inquiry" },
        { name: "구매하기", href: "order" },
      ]);
    } else {
      setHeaderItemsRight([
        { name: "로그인", href: "login" },
        { name: "장바구니", href: "cart" },
        { name: "구매하기", href: "order" },
      ]);
    }
  }, []);

  const headerRight = [];
  for (let i in headerItemsRight) {
    let headerItem = headerItemsRight[i];
    headerRight.push(
      <li key={headerItem.name}>
        <button onClick={headerItem.onClick}>
          {headerItem.href ? (
            <a href={"/" + headerItem.href}>{headerItem.name}</a>
          ) : (
            headerItem.name
          )}
        </button>
      </li>
    );
  }
  return (
    <header className="header">
      <ul className="header-items">
        <li>
          <a href={"/"}>
            <img className="logo-img" src={logo} />
          </a>
        </li>
        {headerLeft}
      </ul>
      <ul className="header-items">{headerRight}</ul>
    </header>
  );
}
