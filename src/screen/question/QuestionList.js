import Header from "../../component/Header";
import Footer from "../../component/Footer";
import styled from "styled-components";
import {
  EmptyListExpression, PageNumberButton, QuestionAddButton, QuestionAddButtonWrapper,
  QuestionListContainer,
  QuestionListTable,
  QuestionListTableBodyRow,
  QuestionListTableBodyWriteTimestamp,
  QuestionListTableHeader,
  QuestionListTableHeaderSmallItem, QuestionListTablePageNumberButtonWrapper,
  QuestionListTitle,
  QuestionTableHeaderMiddleItem
} from "../../component/question/QuestionComponent";
import { useNavigate } from "react-router";
import { useState } from "react";
import { HTML_EDITOR_MODE } from "../../global/Constants";


export default function QuestionList() {

  const navigate = useNavigate();
  const MOCK_DATA = [];
  // 아래 반복문 잠구면 비었을 경우 표기
  for (let i = 1; i <= 5; i++) {
    MOCK_DATA.push({ no: i, title: "Liberty52 배송 문의", status: "대기", createAt: "2023-04-25", id : `MOCK_QUESTION_ID${i}` });
  }

  const moveToEditorPageButtonClicked = () => {
    navigate(`/question/editor`, {
      state: {
        mode: HTML_EDITOR_MODE.ADD
      }
    });
  };
  const moveToDetailPageButtonClicked = (id) => {
    navigate(`/question/${id}`)
  }


  return <>
    <Header />
    <QuestionListContainer>
      <QuestionListTitle>1:1문의</QuestionListTitle>
      <QuestionListTable>
        <QuestionListTableHeader>
          <QuestionListTableHeaderSmallItem>No</QuestionListTableHeaderSmallItem>
          <th>제목</th>
          <QuestionListTableHeaderSmallItem>상태</QuestionListTableHeaderSmallItem>
          <QuestionTableHeaderMiddleItem>작성시간</QuestionTableHeaderMiddleItem>
        </QuestionListTableHeader>

        <tbody>
        {MOCK_DATA.length !== 0 ? MOCK_DATA.map(d => {
          return <QuestionListTableBodyRow onClick={() => moveToDetailPageButtonClicked(d.id)}>
            <td>{d.no}</td>
            <td>{d.title}</td>
            <td>{d.status}</td>
            <QuestionListTableBodyWriteTimestamp>{d.createAt}</QuestionListTableBodyWriteTimestamp>
          </QuestionListTableBodyRow>;
        }) : ""}
        </tbody>
      </QuestionListTable>


      {MOCK_DATA.length === 0 ? <EmptyListExpression>등록된 문의가 없습니다</EmptyListExpression> : ""}
      {/*TODO CurrentPage가 아닌 애들은 색상 처리 다르게 해주기*/}
      <QuestionListTablePageNumberButtonWrapper>
        <PageNumberButton>1</PageNumberButton>
        <PageNumberButton>2</PageNumberButton>
        <PageNumberButton>3</PageNumberButton>
      </QuestionListTablePageNumberButtonWrapper>

      <QuestionAddButtonWrapper >
        <QuestionAddButton onClick={moveToEditorPageButtonClicked}>문의 작성</QuestionAddButton>
      </QuestionAddButtonWrapper>
    </QuestionListContainer>
    <Footer />
  </>;
}