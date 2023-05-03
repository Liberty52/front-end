import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CurrentHtmlSizeSpan,
  HTMLEditor,
  HTMLSizeLimiter,
  MoveToListButton,
  QuestEditorTitleInput,
  QuestionContainer,
  QuestionEditorHeader,
  QuestionPageButton,
  QuestionPageButtonWrapper
} from "../../component/question/QuestionComponent";
import { Editor } from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { HTML_EDITOR_MODE } from "../../global/Constants";
import { useNavigate } from "react-router";
import { createQuestion, updateQuestion, uploadImage } from "../../axios/question/QuestionEditor";
import { getQuestionDetail } from "../../axios/question/QuestionDetail";
import "./QuestionEditor.css";


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

  const effect = async () => {
    const isMobile = /Mobi/i.test(window.navigator.userAgent); // "Mobi" 가 User agent에 포함되어 있으면 모바일
    const mode = location.state.mode;
    let data;
    if (mode === HTML_EDITOR_MODE.ADD) {
      data = ' ';
    } else {
      let PREV_DATA;
      await getQuestionDetail(location.state.id).then(res => {
        PREV_DATA = res.data;
      })
      data = PREV_DATA.content;
      setHtmlSize(data.length)
      setContent(data)
      setPrevData(PREV_DATA);
      setTitle(PREV_DATA.title)
    }


    editor = new Editor({
      el: document.querySelector('#editor'),
      previewStyle: 'vertical',
      height: '500px',
      initialEditType: 'wysiwyg',
      initialValue: data,
      language: "ko-KR",
      hideModeSwitch: true,
      autofocus: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task'],
        ['table', 'image', 'link'],
      ],
      events: {
        change: editorHTMLChanged
      },
      hooks: {
        addImageBlobHook: (blob, callback) => uploadImages(blob, callback)
      }
    });
    if(isMobile)
      editor.setHeight("300px");
  }
  useEffect( () => {
    effect();
  },[])

  const uploadImages = (blob, callback) => {
    uploadImage(blob).then(res => {
      callback(res.data)
    });
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

  function moveToQuestionDetailPage() {
    navigate(`/question/${location.state.id}`, {
      replace: true
    });
  }

  function updateQuestionButtonClikced() {
    alert("수정됐습니다!");
    const data = {
      title: title,
      content: content,
    };
    updateQuestion(data ,moveToQuestionDetailPage,prevData.id)
    ;
  }

  function addQuestion() {
    alert("글이 추가되었습니다!");

    const data = {
      title: title,
      content: content,
    };
    createQuestion(data,moveToListButtonClicked);
  }
  const validateTitle = () => {
    if(title.length < 1){
      alert("제목을 작성해주세요!")
      return false;
    }
    if(title.length > 50){
      alert("제목은 50자를 초과할 수 없습니다.")
      return false;
    }
    return true;
  }

  const editorActionButtonClicked = () => {
    if(!validateTitle())
      return;
    if(!validateContent())
      return;

    if(location.state.mode === HTML_EDITOR_MODE.UPDATE){
      updateQuestionButtonClikced();
    }else{
      addQuestion();
    }
  }

  function validateContent(){
    if(contentValidator()){
      alert("내용을 입력해주세요")
      return false;
    }
      return true;
  }


  function contentValidator(){

    let stack = [];
    let v = "";
    for (let i = 0; i < content.length; i++) {
        if(content.charAt(i)=== '<'){
          stack.push(content.charAt(i))
        }
        else if(content.charAt(i) === '>'){
          stack = [];
        }
        else if(stack.length==0)
          v = v + content.charAt(i);
    }
    return v.trim().length === 0;
  }

  return <>
    <Header/>
    <QuestionContainer>
      <QuestionEditorHeader>
            1:1문의
      </QuestionEditorHeader>
      <QuestEditorTitleInput autoFocus value={title} type={"text"} placeholder={"제목을 입력해주세요"} onChange={titleInputChanged}/>
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
    </QuestionContainer>
    <Footer/>
  </>
}