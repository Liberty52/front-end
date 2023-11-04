import { useEffect, useState } from "react";
import { retrieveNoticeDetail } from "../../axios/support/Notice";
import {
  MoveToListButton,
  DetailPageButtonWrapper,
  Viewer,
} from "../question/QuestionComponent";
import NoticeComment from "./NoticeComment";
import { Editor } from "@toast-ui/editor";
import {
  MoveListAnchor,
  NoticeDetailCreatedAt,
  NoticeDetailHeader,
  NoticeDetailTitle,
} from "./style/Notice";

export default function NoticeDetail({ noticeId, clearNoticeId }) {
  const [data, setData] = useState();
  const [comments, setComments] = useState([]);

  const effect = async () => {
    try {
      const res = await retrieveNoticeDetail(noticeId);
      setData(res.data);
      const viewer = new Editor.factory({
        el: document.querySelector("#viewer"),
        height: "500px",
        initialEditType: "wysiwyg",
        initialValue: res.data.content,
        language: "ko-KR",
        viewer: true,
      });
    } catch (e) {}
  };
  useEffect(() => {
    effect();
  }, [noticeId]);

  return (
    <>
      <NoticeDetailHeader>
        {data && (
          <div>
            <NoticeDetailTitle>{data.title}</NoticeDetailTitle>
            <NoticeDetailCreatedAt>
              <MoveListAnchor onClick={clearNoticeId}>공지사항</MoveListAnchor>{" "}
              {data.createdAt}
            </NoticeDetailCreatedAt>
          </div>
        )}
      </NoticeDetailHeader>
      <Viewer id={"viewer"}></Viewer>
      <NoticeComment comments={comments} />
      {data ? (
        <DetailPageButtonWrapper>
          <MoveToListButton onClick={clearNoticeId}>목록</MoveToListButton>
        </DetailPageButtonWrapper>
      ) : (
        <></>
      )}
    </>
  );
}
