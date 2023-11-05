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
  const [page, setPage] = useState(0);
  const logined = sessionStorage.getItem(ACCESS_TOKEN) ? true : false;

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    const res = await retrieveComments(noticeId, page);
    setComments(res.data.content);
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    if (content === "") {
      alert("댓글 내용을 입력해주세요");
      return;
    }
    const res = await postComment(noticeId, content);
    if (res.status === 200) {
      getComment();
      e.target.content.value = "";
    } else if (res.status === 401) {
      alert("로그인이 필요한 기능입니다");
    }
  };

  return (
    <>
      <CommentListContainer>
        {comments.length === 0 ? (
          <span>댓글이 없습니다</span>
        ) : (
          comments.map((comment) => {
            return <CommentItem key={comment.commentId} comment={comment} />;
          })
        )}
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
        <WriterName>{comment.writerName}</WriterName>
        <Date>{formatDate(comment.createdAt)}</Date>
      </CommentInfo>
      <Content>{comment.content}</Content>
    </CommentContainer>
  );
}

function formatDate(date) {
  var dateParts = date.split("T");
  var datePart = dateParts[0];
  var timePart = dateParts[1].split(".")[0].slice(0, 5);
  var formattedDate = datePart + " " + timePart;

  return formattedDate;
}
