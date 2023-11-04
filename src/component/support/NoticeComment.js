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

export default function NoticeComment({ comments }) {
  return (
    <>
      <CommentListContainer>
        <CommentItem />
        <CommentItem />
      </CommentListContainer>
      <InputContainer>
        <CommentInput variant="outlined" />
        <CommentButton>작성</CommentButton>
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
