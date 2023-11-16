import './Main.css';
import chromaluxe_img from '../../image/icon/chromaluxe.jpg';
import speaker_img from '../../image/icon/speaker.jpg';
import product_img from '../../image/icon/main.jpg';
import liberty52_img from '../../image/icon/liberty52.jpg';
import Header from '../../component/common/Header';
import Footer from '../../component/common/Footer';
import $ from 'jquery';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/token';
import { useEffect } from 'react';
import { refreshToken } from '../../axios/login/Login';
import { MAIN } from '../../constants/path';

function Section() {
  return (
    <div id='s1' className='section section-3'>
      <div style={{ height: '22%' }}></div>
      <div className='liberty-info text-group'>
        <div className='text1'>Liberty 52_Frame</div>
        <div className='text2'>One & Only Speaker</div>
        <div className='text3'>내가 만드는 세상 유일</div>
        <a className='choose-button' href='/choose'>
          구매하기
        </a>
      </div>
      <div style={{ height: '33.3%', display: 'flex', justifyContent: 'center' }}>
        <img className='image' src={product_img} alt='Liberty52_frame'></img>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div id='s2' className='section section-row'>
      <div className='text-group'>
        <h1>Chromaluxe</h1>
        <p style={{ fontSize: '20px' }}>1mm 두께 승화전사 인쇄용 알루미늄시트</p>
        <a className='choose-button' href='/choose'>
          구매하기
        </a>
      </div>
      <img className='chromaluxe_img' src={chromaluxe_img} alt='chromaluxe_img' />
    </div>
  );
}

function Section3() {
  return (
    <div id='s3' className='section section-row'>
      <img src={speaker_img} alt='speaker_img' />
      <div className='text-group'>
        <h1>진동 블루투스 스피커</h1>
        <p style={{ fontSize: '20px' }}>고성능 블루투스 스피커 탑재</p>
        <a className='choose-button' href='/choose'>
          구매하기
        </a>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div id='s4' className='section section-row reverse'>
      <img src={liberty52_img} alt='speaker_img' />
      <div className='text-group'>
        <h1>세계 유일</h1>
        <p style={{ fontSize: '20px' }}>나만의 액자형 스피커</p>
        <a className='choose-button' href='/choose'>
          구매하기
        </a>
      </div>
    </div>
  );
}

export default function Main() {
  async function tokenRefresh() {
    let savedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (savedRefreshToken === null || savedRefreshToken === undefined) return;
    if (sessionStorage.getItem(ACCESS_TOKEN)) return;
    try {
      const response = await refreshToken();
      sessionStorage.setItem(ACCESS_TOKEN, response.headers.access);
      localStorage.setItem(REFRESH_TOKEN, response.headers.refresh);
      window.location.href = MAIN;
    } catch (e) {}
  }

  useEffect(() => {
    tokenRefresh();
  }, []);

  window.addEventListener(
    // 휠 기본 기능 막기
    'wheel',
    function (e) {
      e.preventDefault();
    },
    { passive: false },
  );

  window.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
    },
    { passive: false },
  );

  var mHtml = $('html');
  var page = 1;

  mHtml.animate({ scrollTop: 0 }, 10); // Y가 0이 아닐 경우 대비

  $(window).on('wheel', function (e) {
    if (mHtml.is(':animated')) return;
    if (e.originalEvent.deltaY > 0) {
      // deltaY가 양수면 휠을 아래로 내리는 중, 음수면 위로 올리는 중
      if (page === 5) return; // 끝까지 내렸을 때 리턴함으로 휠이동 방지
      page++;
    } else if (e.originalEvent.deltaY < 0) {
      if (page === 1) return;
      page--;
    }

    var posTop = (page - 1) * $(window).height(); // 각 section의 top부분 계산
    mHtml.animate({ scrollTop: posTop });
  });

  let delta = 0;

  $(window).on('touchstart', function (e) {
    delta = e.originalEvent.touches[0].pageY;
  });

  $(window).on('touchend', function (e) {
    delta -= e.originalEvent.changedTouches[0].pageY;

    if (mHtml.is(':animated')) return;
    if (delta > 0) {
      // deltaY가 양수면 휠을 아래로 내리는 중, 음수면 위로 올리는 중
      if (page === 5) return; // 끝까지 내렸을 때 리턴함으로 휠이동 방지
      page++;
    } else if (delta < 0) {
      if (page === 1) return;
      page--;
    }

    var posTop = (page - 1) * $(window).height(); // 각 section의 top부분 계산
    mHtml.animate({ scrollTop: posTop });
  });

  return (
    <div className='main'>
      <Header fixed />
      <Section />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
    </div>
  );
}
