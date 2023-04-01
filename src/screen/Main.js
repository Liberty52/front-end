import './Main.css';
import image from '../image/icon/liberty52.jpg';

function Header() {
  const headerItemsLeft = [
    { name: '로고', href: '#' },
    { name: '제품소개', href: '#' },
    { name: '사업소개', href: '#' },
    { name: '지점소개(쇼룸)', href: '#' },
  ];

  const headerLeft = [];
  for (let i in headerItemsLeft) {
    let headerItem = headerItemsLeft[i];
    headerLeft.push(
      <li key={headerItem.name}>
        <a href={'/' + headerItem.href}>{headerItem.name}</a>
      </li>
    );
  }

  const headerItemsRight = [
    { name: '로그인', href: 'login' },
    { name: '바로구매', href: '#' },
  ];

  const headerRight = [];
  for (let i in headerItemsRight) {
    let headerItem = headerItemsRight[i];
    headerRight.push(
      <li key={headerItem.name}>
        <a href={'/' + headerItem.href}>{headerItem.name}</a>
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
        <div>
          <span className="text2">임시로 만든 메인 페이지</span>
        </div>
        <div>
          <span className="text1">Liberty 52_Frame</span>
        </div>
      </div>
      <div>
        <button className="outline-button">구매하기</button>
      </div>
      <div>
        <img className="image" src={image}></img>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <div>
      <Header />
      <Section />
    </div>
  );
}
