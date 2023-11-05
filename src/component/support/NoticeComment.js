import { useState, useEffect } from "react";
import {
  CommentListContainer,
  CommentContainer,
  InputContainer,
  CommentInput,
  CommentButton,
  CommentInfo,
  WriterName,
  Content,
  Date,
} from "./style/Notice";
import { postComment, retrieveComments } from "../../axios/support/Notice";
import { ACCESS_TOKEN } from "../../constants/token";

export default function NoticeComment({ noticeId }) {
  const [comments, setComments] = useState([]);
  const logined = sessionStorage.getItem(ACCESS_TOKEN) ? true : false;

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const res = await retrieveComments(noticeId);
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    const res = await postComment(noticeId, content);
    if (res.status === 401) {
      alert("로그인이 필요한 기능입니다");
    }
  };

  return (
    <>
      <CommentListContainer>
        <CommentItem />
        <CommentItem />
      </CommentListContainer>
      <InputContainer onSubmit={submitComment}>
        <CommentInput
          name="content"
          variant="outlined"
          placeholder={
            logined ? "" : "로그인 한 고객님만 댓글 작성이 가능합니다."
          }
          disabled={!logined}
        />
        <CommentButton type="submit" disabled={!logined}>
          작성
        </CommentButton>
      </InputContainer>
    </>
  );
}

function CommentItem({ comment }) {
  return (
    <CommentContainer>
      <CommentInfo>
        <WriterName>이한별</WriterName>
        <Date>2023-11-05 03:13</Date>
      </CommentInfo>
      {/* createdAt updatedAt */}
      <Content>내용</Content>
    </CommentContainer>
  );
}
// "commentId": "72735f0a-4a15-4a1d-ab03-e8f200bbe476", //댓글id
// "noticeId": "NOTICE-001", //해당 댓글이 속한 공지사항id
// "writerId": "TESTER-001", //해당 댓글 작성자id
// "writerName": "김테스터", //해당 댓글 작성자 이름
// "writerEmail": "test@gmail.com", //해당 댓글 작성자 이메일
// "content": "댓글이에요", //댓글 내용
// "createdAt": "2023-11-02T22:45:18.586432", //생성시각
// "updatedAt": null //수정시각
