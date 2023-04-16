import "./Main.css";
import liberty52_img from "../image/icon/liberty52.jpg";
import chromaluxe_img from "../image/icon/chromaluxe.jpg";
import speaker_img from "../image/icon/speaker.jpg";
import youtube_img from "../image/icon/youtube.png";
import instargram_img from "../image/icon/instagram.png";
import kakaotalk_img from "../image/icon/kakao-talk.png";
import $ from "jquery";
import { useEffect, useState } from "react";

export function Header() {
  const headerItemsLeft = [
    { name: "로고", href: "#" },
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
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setHeaderItemsRight([
        { name: "내정보", href: "myInfo" },
        {
          name: "로그아웃",
          onClick: () => {
            if (window.confirm("로그아웃하시겠습니까?")) {
              localStorage.removeItem("ACCESS_TOKEN");
              localStorage.removeItem("REFRESH_TOKEN");
              window.location.href = "/";
            }
          },
          href: "#",
        },
        { name: "장바구니", href: "cart" },
        { name: "구매하기", href: "order" },
      ]);
    } else {
      setHeaderItemsRight([
        { name: "로그인", href: "login" },
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
          <a href={"/" + headerItem.href}>{headerItem.name}</a>
        </button>
      </li>
    );
  }
  return (
    <div className="header">
      <ul className="header-items">{headerLeft}</ul>
      <ul className="header-items">{headerRight}</ul>
    </div>
  );
}

function Section() {
  return (
    <div className="section">
      <div className="text-group">
        <div className="text2">Liberty 52_Frame</div>
        <div className="text1">One & Only Speaker</div>
        <div className="text3">내가 만드는 세상 유일</div>
      </div>
      <div>
        <a href="/order">구매하기</a>
      </div>
      <div>
        <img className="image" src={liberty52_img} alt="Liberty52_frame"></img>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="section-row background">
      <div className="text-group">
        <h1>Chromaluxe</h1>
        1mm 두께 승화전사 인쇄용 알루미늄시트
      </div>
      <img
        className="chromaluxe_img"
        src={chromaluxe_img}
        alt="chromaluxe_img"
      ></img>
    </div>
  );
}
function Section3() {
  return (
    <div className="section-row">
      <img src={speaker_img} alt="speaker_img"></img>
      <div className="text-group">
        <h1>진동 블루투스 스피커</h1>
        고성능 블루투스 스피커 탑재
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="inner">
        <div className="menu">
          <ul className="policy">
            <li>이용약관</li>
            <li>개인정보처리방침</li>
          </ul>
          <div className="sns">
            <a href="https://www.youtube.com/channel/UCIbIrjFdjOXjo38wBrfmbug">
              <img src={youtube_img} alt="youtube" />
            </a>
            <a href="https://www.instagram.com/bloomsburylab_official/">
              <img src={instargram_img} alt="instargram" />
            </a>
            <a href="https://pf.kakao.com/_kccws">
              <img src={kakaotalk_img} alt="kakaotalk" />
            </a>
          </div>
        </div>
        <div className="info">
          <div>상호명: (주)블룸즈베리랩</div>
          <div>대표자: 김요섭 | 개인정보관리 책임자: 김요섭</div>
          <div>주소: 서울특별시 강남구 봉은사로 86길 6 레베쌍트빌딩 9층</div>
          <div>대표번호: 02-6419-2004</div>
          <div>이메일: cs@bloomsburylab.com</div>
          <div>
            사업자등록번호: 330-87-02797 | 통신판매업신고번호:
            2023-서울강남-00978
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Main() {
  window.addEventListener(
    // 휠 기본 기능 막기
    "wheel",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  var mHtml = $("html");
  var page = 1;

  mHtml.animate({ scrollTop: 0 }, 10); // Y가 0이 아닐 경우 대비

  $(window).on("wheel", function (e) {
    if (mHtml.is(":animated")) return;
    if (e.originalEvent.deltaY > 0) {
      // deltaY가 양수면 휠을 아래로 내리는 중, 음수면 위로 올리는 중
      if (page === 4) return; // 끝까지 내렸을 때 리턴함으로 휠이동 방지
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page === 1) return;
      page--;
    }

    var posTop = (page - 1) * $(window).height(); // 각 section의 top부분 계산
    mHtml.animate({ scrollTop: posTop });
  });

  return (
    <>
      <Header />
      <Section />
      <Section2 />
      <Section3 />
      <Footer />
    </>
  );
}
