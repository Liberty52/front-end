import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";
import {
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
  QuestionListContainer
} from "../../component/question/QuestionComponent";
import { DELETE_MOCK_DATA, GET_MOCK_DETAIL_DATA } from "../../global/QuestionMockApi";
import { useEffect, useState } from "react";
import { Editor } from "@toast-ui/editor";
import { useNavigate } from "react-router";
import { HTML_EDITOR_MODE } from "../../global/Constants";


export default function QuestionDetail(){

  const navigate = useNavigate();
  const {id} = useParams();
  const [data,setData] = useState();

  useEffect(() => {
    const  prevData = GET_MOCK_DETAIL_DATA(id);
    setData(prevData)

    const viewer = new Editor.factory({
      el: document.querySelector('#viewer'),
      height: '500px',
      initialEditType : 'wysiwyg',
      initialValue : prevData.content,
      language : "ko-KR",
      viewer : true
    });
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

    DELETE_MOCK_DATA(id)
    navigate('/question',{
      replace : true
    })
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
              <QuestionDetailSideStatus>{data.status}</QuestionDetailSideStatus>
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


      {/*  TODO 답장 필드 추가해야 함.*/}

      </QuestionDetailContentWrapper>
      <QuestionDetailPageButtonWrapper>
        <MoveToListButton onClick={moveToListButtonClicked}>뒤로가기</MoveToListButton>
      </QuestionDetailPageButtonWrapper>
    </QuestionListContainer>
    <Footer/>
  </>
}