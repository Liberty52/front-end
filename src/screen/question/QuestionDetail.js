import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";
import {
  EnterImage,
  MoveToListButton,
  QuestionDetailActionButton,
  QuestionDetailActionDivider,
  QuestionDetailActionWrapper,
  QuestionDetailContentWrapper,
  QuestionDetailPageButtonWrapper,
  QuestionDetailSide,
  QuestionDetailSideCreatedAt,
  QuestionDetailSideStatus,
  QuestionDetailTitle,
  QuestionDetailTitleWrapper,
  QuestionDetailViewer,
  QuestionEditorHeader,
  QuestionListContainer, QuestionReplyContentWrapper, QuestionReplyEnterWrapper, QuestionReplyWrapper
} from "../../component/question/QuestionComponent";
import { useEffect, useState } from "react";
import { Editor } from "@toast-ui/editor";
import { useNavigate } from "react-router";
import { HTML_EDITOR_MODE } from "../../global/Constants";
import { deleteQuestion, getQuestionDetail } from "../../axios/question/QuestionDetail";
import { convertQuestionStatus } from "../../utils";
import styled from "styled-components";
import enter from "../../image/icon/arrow-enter.svg"


export default function QuestionDetail(){

  const navigate = useNavigate();
  const {id} = useParams();
  const [data,setData] = useState();

  useEffect(() => {
    let prevData;
    try{
      getQuestionDetail(id)
        .then(res => {
          prevData = res.data;
          setData(prevData)
          const viewer = new Editor.factory({
            el: document.querySelector('#viewer'),
            height: '500px',
            initialEditType : 'wysiwyg',
            initialValue : prevData.content,
            language : "ko-KR",
            viewer : true
          });
        });
    }catch (err){
      console.error(err)
    }
    setData(prevData)
  },[])

  const updateButtonClicked = () => {
    navigate('/question/editor',{
      replace : true,
      state : {
        id,
        mode : HTML_EDITOR_MODE.UPDATE
      }
    })
  }
  const deleteButtonClicked = () => {

    if(window.confirm("정말로 삭제하시겠습니까?")){
      deleteQuestion(id).then(() => {
        navigate('/question',{
          replace : true
        })
      }).catch(err => console.error(err));
    }


  }
  const moveToListButtonClicked = () => {
    navigate('/question', {
      replace : true
    })
  }
  return <>
    <Header/>
    <QuestionListContainer>
      <QuestionEditorHeader>
        1:1문의
      </QuestionEditorHeader>
      <QuestionDetailContentWrapper>
      {data !== undefined ? <>
          <QuestionDetailTitleWrapper>
            <QuestionDetailTitle>{data.title}</QuestionDetailTitle>
            <QuestionDetailSide>
              <QuestionDetailSideStatus>{convertQuestionStatus(data.status)}</QuestionDetailSideStatus>
              <QuestionDetailSideCreatedAt>{data.createdAt}</QuestionDetailSideCreatedAt>
            </QuestionDetailSide>
          </QuestionDetailTitleWrapper>

      </> : <></>}
      <QuestionDetailViewer id={"viewer"}></QuestionDetailViewer>
        <QuestionDetailActionWrapper>
          <QuestionDetailActionButton onClick={updateButtonClicked}>수정</QuestionDetailActionButton>
          <QuestionDetailActionDivider>/</QuestionDetailActionDivider>
          <QuestionDetailActionButton onClick={deleteButtonClicked}>지우기</QuestionDetailActionButton>
        </QuestionDetailActionWrapper>

      </QuestionDetailContentWrapper>

      {data?.questionReplyResponse !== null ?
        <QuestionReplyWrapper>
          <QuestionReplyEnterWrapper>
          <EnterImage src={enter}/>
          </QuestionReplyEnterWrapper>
          <QuestionReplyContentWrapper>
            {data?.questionReplyResponse.replyContent}
          </QuestionReplyContentWrapper>
        </QuestionReplyWrapper>
        :  ""}
      <QuestionDetailPageButtonWrapper>
        <MoveToListButton onClick={moveToListButtonClicked}>뒤로가기</MoveToListButton>
      </QuestionDetailPageButtonWrapper>
    </QuestionListContainer>
    <Footer/>
  </>
}