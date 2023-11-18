import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const IntroductionContainer = styled.div`
  text-align: center;

  > p {
    margin: 0;
    line-height: 160%;
  }

  img {
    width: 60%;
  }

  button {
    appearance: auto;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    box-sizing: border-box;
    background-color: buttonface;
    margin: 0em;
    padding-block: 1px;
    padding-inline: 6px;
    border: 1px outset buttonborder;
    border-image: initial;
    border-radius: 3px;
  }

  ul {
    list-style: initial;
  }
`;

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

  return <IntroductionContainer ref={contentRef} />;
}
