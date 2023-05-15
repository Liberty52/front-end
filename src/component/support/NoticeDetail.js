import styled from "styled-components";
import { useEffect, useState } from "react";
import { retrieveNoticeDetail } from "../../axios/support/Notice";
import {
  MoveToListButton,
  QuestionDetailActionButton,
  DetailPageButtonWrapper,
  Viewer
} from "../question/QuestionComponent";
import { Editor } from "@toast-ui/editor";
import {
  MoveListAnchor,
  NoticeDetailCreatedAt,
  NoticeDetailHeader,
  NoticeDetailTitle
} from "./style/Notice";



export default function NoticeDetail({noticeId, clearNoticeId}){
  const [data,setData] = useState();
  const effect = async () => {
    try{
      const res = await retrieveNoticeDetail(noticeId);
      setData(res.data);
      const viewer = new Editor.factory({
        el: document.querySelector('#viewer'),
        height: '500px',
        initialEditType : 'wysiwyg',
        initialValue : res.data.content,
        language : "ko-KR",
        viewer : true
      });
    }catch (e){

    }
  }
  useEffect(() => {
    effect();
  },[noticeId])


  return (
    <>
      <NoticeDetailHeader>
        {data?
          <div>
            <NoticeDetailTitle>{data.title}</NoticeDetailTitle>
            <NoticeDetailCreatedAt><MoveListAnchor onClick={clearNoticeId}>공지사항</MoveListAnchor> {data.createdAt}</NoticeDetailCreatedAt>
          </div> : <></>
        }
      </NoticeDetailHeader>
      <Viewer id={"viewer"}></Viewer>

      {/*  TODO 댓글 작성 필드 넘어오는 속성 값에 따라서 댓글 창 On/Off를 해 주어야 한다.*/}
      {/*  TODO 댓글 리스트 조회 필드*/}
      {data ? <DetailPageButtonWrapper>
        <MoveToListButton onClick={clearNoticeId}>목록</MoveToListButton>
      </DetailPageButtonWrapper> : <></>}

    </>
  )
}