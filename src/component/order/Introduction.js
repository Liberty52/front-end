import { useEffect, useRef } from 'react';
import './Introduction.css';
// 상품 소개
export default function Introduction({ content }) {
  const contentRef = useRef();

  useEffect(() => {
    if (content !== '' && content) {
      contentRef.current.innerHTML = content;
    } else {
      contentRef.current.innerText = '상품 정보가 없습니다';
    }
  }, [content]);

  return <div className='content-container' ref={contentRef} style={{ textAlign: 'center' }}></div>;
}
