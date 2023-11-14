import './Header.css';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants/token';
import logo from '../../image/Logo.svg';
import menuImg from '../../image/icon/menu.png';
import menuImgActive from '../../image/icon/menu-active.png';
import userMenuImg from '../../image/icon/user-menu.png';
import userMenuImgActive from '../../image/icon/user-menu-active.png';
import ImageButton from './ImageButton';
import { MAIN } from '../../constants/path';

function LargeHeader({ headerLeft, headerRight, fixed }) {
  return (
    <header className={fixed ? 'header header-lg header-fixed' : 'header header-lg'}>
      <ul className='header-items'>
        <li>
          <a href={'/'}>
            <img className='logo-img' src={logo} alt='logo' />
          </a>
        </li>
        {headerLeft}
      </ul>
      <ul className='header-items'>{headerRight}</ul>
    </header>
  );
}

function SmallHeader({ headerLeft, headerRight, fixed }) {
  const [isMenuActive, setMenuActive] = useState(false);
  const [isUserActive, setUserActive] = useState(false);
  return (
    <div className={fixed ? 'header-fixed' : 'header-block'}>
      <header className={'header header-sm'}>
        <ImageButton
          width={'23px'}
          src={isMenuActive ? menuImgActive : menuImg}
          onClick={() => {
            if (!isMenuActive) {
              setUserActive(false);
            }
            setMenuActive(!isMenuActive);
          }}
        />
        <a href={'/'}>
          <img className='logo-img' src={logo} alt='logo' />
        </a>
        <ImageButton
          width={'23px'}
          src={isUserActive ? userMenuImgActive : userMenuImg}
          onClick={() => {
            if (!isUserActive) {
              setMenuActive(false);
            }
            setUserActive(!isUserActive);
          }}
        />
      </header>
      <div className='header-items-group'>
        <ul className={isMenuActive ? 'header-items bar bar-active' : 'header-items bar'}>
          {headerLeft}
        </ul>
        <ul className={isUserActive ? 'header-items bar bar-active' : 'header-items bar'}>
          {headerRight}
        </ul>
      </div>
    </div>
  );
}

export default function Header({ fixed }) {
  const headerItemsLeft = [
    { name: '제품소개', href: '#' },
    { name: '사업소개', href: '#' },
    { name: '지점소개(쇼룸)', href: '#' },
    { name: '고객지원', href: 'support' },
  ];

  const headerLeft = [];
  for (let i in headerItemsLeft) {
    let headerItem = headerItemsLeft[i];
    headerLeft.push(
      <li key={headerItem.name}>
        <a href={'/' + headerItem.href}>{headerItem.name}</a>
      </li>,
    );
  }

  const [headerItemsRight, setHeaderItemsRight] = useState();

  useEffect(() => {
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      setHeaderItemsRight([
        { name: '문의하기', href: 'question' },
        { name: '내정보', href: 'myInfo' },
        {
          name: '로그아웃',
          onClick: () => {
            if (window.confirm('로그아웃하시겠습니까?')) {
              sessionStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(REFRESH_TOKEN);
              window.location.href = MAIN;
            }
          },
        },
        { name: '장바구니', href: 'cart' },
        { name: '주문조회', href: 'inquiry' },
        { name: '구매하기', href: 'order' },
      ]);
    } else {
      setHeaderItemsRight([
        { name: '로그인', href: 'login' },
        { name: '장바구니', href: 'cart' },
        { name: '구매하기', href: 'order' },
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
            <a href={'/' + headerItem.href}>{headerItem.name}</a>
          ) : (
            headerItem.name
          )}
        </button>
      </li>,
    );
  }
  return (
    <>
      <LargeHeader
        headerLeft={headerLeft}
        headerRight={headerRight}
        fixed={fixed ? fixed : false}
      />
      <SmallHeader
        headerLeft={headerLeft}
        headerRight={headerRight}
        fixed={fixed ? fixed : false}
      />
    </>
  );
}
