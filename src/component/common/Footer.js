import './Footer.css';
import { useState } from 'react';
import youtube_img from '../../image/icon/youtube.png';
import instargram_img from '../../image/icon/instagram.png';
import kakaotalk_img from '../../image/icon/kakao-talk.png';
import Modal from './Modal';

function Info({ className }) {
  return (
    <div className={className}>
      <div>상호명: (주)블룸즈베리랩</div>
      <div>대표자: 김요섭 | 개인정보관리 책임자: 김요섭</div>
      <div>주소: 서울특별시 강남구 봉은사로 86길 6 레베쌍트빌딩 9층</div>
      <div>대표번호: 02-6419-2004</div>
      <div>이메일: cs@bloomsburylab.com</div>
      <div>사업자등록번호: 330-87-02797 | 통신판매업신고번호: 2023-서울강남-00978</div>
    </div>
  );
}

export default function Footer() {
  const [modal, setModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  return (
    <footer className='footer'>
      {modal && (
        <Modal title={selectedPolicy.title} closeModal={() => setModal(false)}>
          {selectedPolicy.content}
        </Modal>
      )}
      <div className='inner'>
        <div className='menu'>
          <ul className='policy'>
            <li
              onClick={() => {
                setModal(true);
                setSelectedPolicy({
                  title: '이용약관',
                  content: '이용약관을 입력해주세용요용',
                });
              }}
            >
              이용약관
            </li>
            <li
              onClick={() => {
                setModal(true);
                setSelectedPolicy({
                  title: '개인정보처리방침',
                  content: '개인정보처리방침을 입력해주세용요용',
                });
              }}
            >
              개인정보처리방침
            </li>
            <li
              className='info-btn'
              onClick={() => {
                setModal(true);
                setSelectedPolicy({
                  title: '회사정보',
                  content: <Info className='modal-info' />,
                });
              }}
            >
              회사정보
            </li>
          </ul>
          <div className='sns'>
            <a href='https://www.youtube.com/channel/UCIbIrjFdjOXjo38wBrfmbug'>
              <img src={youtube_img} alt='youtube' />
            </a>
            <a href='https://www.instagram.com/bloomsburylab_official/'>
              <img src={instargram_img} alt='instargram' />
            </a>
            <a href='https://pf.kakao.com/_kccws'>
              <img src={kakaotalk_img} alt='kakaotalk' />
            </a>
          </div>
        </div>
        <Info className='info' />
      </div>
    </footer>
  );
}
