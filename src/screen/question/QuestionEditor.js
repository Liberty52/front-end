import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  ColumnDirectionFlexBox,
  QuestionPageButton,
  QuestionPageButtonWrapper
} from "../../component/question/QuestionComponent";
import { Editor } from "@toast-ui/editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { HTML_EDITOR_MODE } from "../../global/Constants";
import { useNavigate } from "react-router";
import { ADD_MOCK_DATA, GET_NEXT_NO } from "../../global/QuestionMockApi";
import uuid from "react-uuid";


const QuestionEditorPageContainer = styled(ColumnDirectionFlexBox)`
  padding: 30px 200px;

`
const QuestionEditorHeader = styled.div`
  font-weight: 600;
  font-size: 32px;
  border-bottom: 3px solid black;
  padding : 20px 55px;
`

const QuestEditorTitleInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 30px 0px 15px 0px;
  font-weight: bold;
  border-color: rgba(0,0,0,0.4);
  border-radius: 5px;
  padding: 0px 10px;
`

const HTMLSizeLimiter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 10px 0px;
`
const HTMLEditor = styled.div`
  width: 100%;
`
const CurrentHtmlSizeSpan = styled.span`
  color: ${props => props.isExeed ? 'red' : 'black'} ;
`
const MoveToListButton = styled(QuestionPageButton)`
  margin-right: 10px;
`

export default function QuestionEditor(){
  const MAX_HTML_SIZE = 10000;
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [htmlSize, setHtmlSize] = useState(0);
  const [exceed, setExceed] = useState(false);

  let editor;
  useEffect(() => {
    editor = new Editor({
      el: document.querySelector('#editor'),
      previewStyle: 'vertical',
      height: '500px',
      initialEditType : 'wysiwyg',
      initialValue : ' ',
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
      <QuestEditorTitleInput type={"text"} placeholder={"제목을 입력해주세요"} onChange={titleInputChanged}/>
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