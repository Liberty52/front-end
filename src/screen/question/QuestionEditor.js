import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  ColumnDirectionFlexBox, CurrentHtmlSizeSpan,
  HTMLEditor,
  HTMLSizeLimiter, MoveToListButton,
  QuestEditorTitleInput,
  QuestionEditorHeader,
  QuestionEditorPageContainer,
  QuestionPageButton,
  QuestionPageButtonWrapper
} from "../../component/question/QuestionComponent";
import { Editor } from "@toast-ui/editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { HTML_EDITOR_MODE } from "../../global/Constants";
import { useNavigate } from "react-router";
import { ADD_MOCK_DATA, GET_MOCK_DETAIL_DATA, GET_NEXT_NO, UPDATE_MOCK_DATA } from "../../global/QuestionMockApi";
import uuid from "react-uuid";




export default function QuestionEditor(){
  const MAX_HTML_SIZE = 10000;
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);
  const [prevData, setPrevData] = useState();

  let editor;
  useEffect(() => {
    const mode = location.state.mode;
    let data;
    if(mode === HTML_EDITOR_MODE.ADD){
      data = ' ';
    }else{

      const PREV_DATA = GET_MOCK_DETAIL_DATA(location.state.id);
      data = PREV_DATA.content;
      setPrevData(PREV_DATA);
      setTitle(PREV_DATA.title)
    }


    editor = new Editor({
      el: document.querySelector('#editor'),
      previewStyle: 'vertical',
      height: '500px',
      initialEditType : 'wysiwyg',
      initialValue : data,
      language : "ko-KR",
      hideModeSwitch: true,
      events : {
        change : editorHTMLChanged
      },
      hooks : {
        addImageBlobHook: (blob, callback) => uploadImages(blob, callback)
      }
    });
  },[])

  const uploadImages = (blob, callback) => {
    alert("이미지 업로드 중...")
    callback(uuid());
  }

  const titleInputChanged = (event) => {
    setTitle(event.target.value)
  }
  const editorHTMLChanged = () =>{
    setContent(editor.getHTML())
    setHtmlSize(editor.getHTML().length)
    setExceed(editor.getHTML().length > MAX_HTML_SIZE)
  }
  const moveToListButtonClicked = () => {
    navigate('/question', {
      replace : true
    })
  }

  const editorActionButtonClicked = () => {
    if(title.length < 1){
      alert("제목을 작성해주세요!")
      return;
    }



    if(location.state.mode === HTML_EDITOR_MODE.UPDATE){
       alert("수정됐습니다!")
      const data = {
         id : prevData.id,
        title : title,
        content : content,
        status : prevData.status,
        createdAt : prevData.createdAt,
        no : prevData.no
      }

      UPDATE_MOCK_DATA(data);


      navigate(`/question/${location.state.id}`, {
        replace : true
      })
    }else{
      alert("글이 추가되었습니다!")
      const date = new Date();
      const data = {
        id : uuid(),
        title : title,
        content : content,
        status : '대기',
        createdAt : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() ,
        no : GET_NEXT_NO()
      }
      ADD_MOCK_DATA(data);
      moveToListButtonClicked()
    }
  }


  return <>
    <Header/>
    <QuestionEditorPageContainer>
      <QuestionEditorHeader>
            1:1문의
      </QuestionEditorHeader>
      <QuestEditorTitleInput value={title} type={"text"} placeholder={"제목을 입력해주세요"} onChange={titleInputChanged}/>
      <HTMLEditor id={"editor"}></HTMLEditor>
      <HTMLSizeLimiter>
        <div>
          <CurrentHtmlSizeSpan isExeed={exceed}>{htmlSize}</CurrentHtmlSizeSpan>
           <span> / {MAX_HTML_SIZE}</span>
        </div>
      </HTMLSizeLimiter>
      <QuestionPageButtonWrapper>

        <MoveToListButton onClick={moveToListButtonClicked}>뒤로가기</MoveToListButton>
        <QuestionPageButton onClick={editorActionButtonClicked}>{
          location.state.mode === HTML_EDITOR_MODE.UPDATE ? "수정하기" : "글 쓰기"
        }</QuestionPageButton>
      </QuestionPageButtonWrapper>
    </QuestionEditorPageContainer>
    <Footer/>
  </>
}