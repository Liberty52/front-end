import Header from "../../component/Header";
import Footer from "../../component/Footer";
import styled from "styled-components";
import {
  EmptyListExpression, PageNumberButton, QuestionPageButton, QuestionPageButtonWrapper,
  QuestionListContainer,
  QuestionListTable,
  QuestionListTableBodyRow,
  QuestionListTableBodyWriteTimestamp,
  QuestionListTableHeader,
  QuestionListTableHeaderSmallItem, QuestionListTablePageNumberButtonWrapper,
  QuestionListHeader,
  QuestionTableHeaderMiddleItem
} from "../../component/question/QuestionComponent";
import { useNavigate } from "react-router";
import { useState } from "react";
import { HTML_EDITOR_MODE } from "../../global/Constants";
import { GET_MOCK_DATA } from "../../global/QuestionMockApi";


export default function QuestionList() {


  const navigate = useNavigate();
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
      <QuestionListHeader>1:1문의</QuestionListHeader>
      <QuestionListTable>
        <thead>
          <QuestionListTableHeader>
            <QuestionListTableHeaderSmallItem>No</QuestionListTableHeaderSmallItem>
            <th>제목</th>
            <QuestionListTableHeaderSmallItem>상태</QuestionListTableHeaderSmallItem>
            <QuestionTableHeaderMiddleItem>작성시간</QuestionTableHeaderMiddleItem>
          </QuestionListTableHeader>
        </thead>
        <tbody>
        {GET_MOCK_DATA().length !== 0 ? GET_MOCK_DATA().map(d => {
          return <QuestionListTableBodyRow key={d.id} onClick={() => moveToDetailPageButtonClicked(d.id)}>
            <td>{d.no}</td>
            <td>{d.title}</td>
            <td>{d.status}</td>
            <QuestionListTableBodyWriteTimestamp>{d.createdAt}</QuestionListTableBodyWriteTimestamp>
          </QuestionListTableBodyRow>;
        }) : <></>}
        </tbody>
      </QuestionListTable>


      {GET_MOCK_DATA().length === 0 ? <EmptyListExpression>등록된 문의가 없습니다</EmptyListExpression> : ""}
      {/*TODO CurrentPage가 아닌 애들은 색상 처리 다르게 해주기*/}
      <QuestionListTablePageNumberButtonWrapper>
        <PageNumberButton>1</PageNumberButton>
        <PageNumberButton>2</PageNumberButton>
        <PageNumberButton>3</PageNumberButton>
      </QuestionListTablePageNumberButtonWrapper>

      <QuestionPageButtonWrapper >
        <QuestionPageButton onClick={moveToEditorPageButtonClicked}>문의 작성</QuestionPageButton>
      </QuestionPageButtonWrapper>
    </QuestionListContainer>
    <Footer />
  </>;
}