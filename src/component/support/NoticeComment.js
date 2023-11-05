import { useState, useEffect } from "react";
import {
  CommentListContainer,
  CommentContainer,
  InputContainer,
  PageContainer,
  CommentInput,
  CommentButton,
  CommentInfo,
  WriterName,
  Content,
  Date,
  Page,
} from "./style/Notice";
import { postComment, retrieveComments } from "../../axios/support/Notice";
import { ACCESS_TOKEN } from "../../constants/token";

export default function NoticeComment({ noticeId }) {
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState({
    startPage: 1,
    lastPage: 1,
    currentPage: 1,
  });
  const logined = sessionStorage.getItem(ACCESS_TOKEN) ? true : false;

  useEffect(() => {
    getComment();
  }, [pages.currentPage]);

  const getComment = async () => {
    const res = await retrieveComments(noticeId, pages.currentPage);
    setComments(res.data.content);
    setPages({
      startPage: 1,
      lastPage: res.data.totalPages,
      currentPage: res.data.pageable.pageNumber + 1,
    });
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

  function Pages() {
    const pageComponents = [];
    for (let i = 1; i <= pages.lastPage; i++) {
      pageComponents.push(
        <Page
          style={{ fontWeight: i === pages.currentPage && "bold" }}
          key={i}
          onClick={() => {
            if (i !== pages.currentPage) setPages({ ...pages, currentPage: i });
          }}
        >
          {i}
        </Page>
      );
    }
    return <PageContainer>{pageComponents}</PageContainer>;
  }

  return (
    <>
      <CommentListContainer>
        {comments.length === 0 ? (
          <div style={{ textAlign: "center", marginBottom: "10px" }}>
            작성된 댓글이 없습니다
          </div>
        ) : (
          comments.map((comment) => {
            return <CommentItem key={comment.commentId} comment={comment} />;
          })
        )}
      </CommentListContainer>
      <Pages />
      <InputContainer onSubmit={submitComment}>
        <CommentInput
          name="content"
          variant="outlined"
          placeholder={logined ? "" : "댓글 작성을 위해 로그인이 필요합니다"}
          disabled={!logined}
        />
        <CommentButton type="submit" disabled={!logined}>
          작성
        </CommentButton>
      </InputContainer>
    </>
  );
}

function formatDate(date) {
  var dateParts = date.split("T");
  var datePart = dateParts[0];
  var timePart = dateParts[1].split(".")[0].slice(0, 5);
  var formattedDate = datePart + " " + timePart;

  return formattedDate;
}
