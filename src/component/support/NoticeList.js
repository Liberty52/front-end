import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { retrieveNoticeList } from '../../axios/support/Notice';
import {
  PageMoveButton,
  PageNumberButton,
  PageNumberButtonWrapper,
} from '../question/QuestionComponent';
import uuid from 'react-uuid';
import { NoticeItem, NoticeItemDate, NoticeListWrapper, NoticeTitle } from './style/Notice';

export default function NoticeList({ setNoticeId }) {
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState([]);
  const effect = async () => {
    try {
      const res = await retrieveNoticeList(10, pageNum);
      setData(res.data);
    } catch (e) {}
  };
  useEffect(() => {
    effect();
  }, [pageNum]);
  const noticeItemClicked = (id) => {
    setNoticeId(id);
  };
  const createPageNumberButton = () => {
    if (data === undefined) return undefined;
    const array = new Array();
    for (let i = data.startPage; i <= data.lastPage; i++) array.push(i);
    return array;
  };

  const pageNumberButtonClicked = (id) => {
    setPageNum(id - 1);
  };
  const pageNumberMinusButtonClicked = () => {
    if (pageNum == 0) return;
    setPageNum((prev) => prev - 1);
  };
  const pageNumberPlusButtonClicked = () => {
    if (pageNum == data.totalPage - 1) return;
    setPageNum((prev) => prev + 1);
  };
  return (
    <>
      <NoticeListWrapper>
        {data?.contents?.map((c) => {
          return (
            <NoticeItem key={uuid()} onClick={() => noticeItemClicked(c.noticeId)}>
              <NoticeTitle>{c.title}</NoticeTitle>
              <NoticeItemDate>{c.createdAt}</NoticeItemDate>
            </NoticeItem>
          );
        })}
      </NoticeListWrapper>

      {data.contents?.length === 0 ? (
        <></>
      ) : (
        <PageNumberButtonWrapper key={uuid()}>
          <PageMoveButton onClick={pageNumberMinusButtonClicked}>&lt;</PageMoveButton>
          {createPageNumberButton()?.map((i) => (
            <PageNumberButton
              key={i}
              isCurrentPage={i === data.currentPage}
              onClick={() => pageNumberButtonClicked(i)}
            >
              {i}
            </PageNumberButton>
          ))}
          <PageMoveButton onClick={pageNumberPlusButtonClicked}>&gt;</PageMoveButton>
        </PageNumberButtonWrapper>
      )}
    </>
  );
}
