import Header from "../../component/common/Header";
import styled from 'styled-components'
import { useState } from "react";
import Faq from "../../component/support/Faq";
import Warranty from "../../component/support/Warranty";
import NoticeList from "../../component/support/NoticeList";
import {
  SupportBodyWrapper,
  SupportHeaderItem,
  SupportHeaderItemList,
  SupportHeaderTitle,
  SupportHeaderWrapper,
  Container
} from "../../component/support/style/Support";
import NoticeDetail from "../../component/support/NoticeDetail";
import uuid from "react-uuid";
import Footer from "../../component/common/Footer";



export default function Support(){
  const [mode,setMode] = useState("FAQ");
  const [noticeId,setNoticeId] = useState("");
  const HeaderItems = [
    {name : "FAQ", onClick : () => changeMode("FAQ")},
    {name : "제품 보증", onClick : () => changeMode("제품 보증")},
    {name : "공지사항", onClick : () => changeMode("공지사항")},
  ]

  const changeMode = (name) => {
    setMode(name);
    setNoticeId("");
  }

  const createBody = () =>{
    switch (mode){
      case "FAQ" : 
        return <Faq/>
      case "제품 보증" : 
        return <Warranty/>
      case "공지사항" : 
        return createNoticeBody();

    }
  }

  const clearNoticeId = () => {
    setNoticeId("");
  }
  const createNoticeBody = () =>{
    if(noticeId==="")
      return <NoticeList setNoticeId={setNoticeId}/>
    return <NoticeDetail clearNoticeId={clearNoticeId}  noticeId={noticeId} />
  }

  return (
    <>
      <Header/>
      <Container>
        <SupportHeaderWrapper>
          <SupportHeaderTitle>고객 지원</SupportHeaderTitle>
          <SupportHeaderItemList>
            {HeaderItems.map(i =>
              <SupportHeaderItem key={uuid()} name={i.name} mode={mode} onClick={i.onClick}>{i.name}</SupportHeaderItem>)}
          </SupportHeaderItemList>
        </SupportHeaderWrapper>
        <SupportBodyWrapper>
          {createBody()}
        </SupportBodyWrapper>
      </Container>
      <Footer/>
    </>
  )
}