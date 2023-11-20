import { useState, useEffect } from 'react';
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
  CommmentEditer,
} from './style/Notice';

import {
  deleteComment,
  patchComment,
  postComment,
  retrieveComments,
} from '../../axios/support/Notice';

import { ACCESS_TOKEN } from '../../constants/token';

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
    const res = await retrieveComments(noticeId, pages.currentPage, logined);
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
    if (content === '') {
      alert('댓글 내용을 입력해주세요');
      return;
    }
    const res = await postComment(noticeId, content);
    if (res.status === 200) {
      getComment();
      e.target.content.value = '';
    } else if (res.status === 401) {
      alert('로그인이 필요한 기능입니다');
    }
  };

  const handleEditComment = async (commentId, content) => {
    const res = await patchComment(noticeId, commentId, content);
    if (res.status === 200) {
      getComment();
    } else if (res.status === 400) {
      alert('잘못된 데이터로 요청하셨습니다');
    } else if (res.status === 401) {
      alert('존재하지 않는 유저입니다');
    } else if (res.status === 403) {
      alert('로그인이 필요한 기능입니다');
    } else if (res.status === 404) {
      alert('존재하지 않는 글입니다.');
    } else {
      alert('오류가 발생했습니다.');
    }
  };
  const handleDeleteComment = async (commentId) => {
    const res = await deleteComment(noticeId, commentId);
    if (res.status === 204) {
      getComment();
    } else if (res.status === 400) {
      alert('잘못된 요청입니다');
    } else if (res.status === 401) {
      alert('존재하지 않는 유저입니다');
    } else if (res.status === 403) {
      alert('로그인이 필요한 기능입니다');
    } else if (res.status === 404) {
      alert('존재하지 않는 글입니다.');
    } else {
      alert('오류가 발생했습니다.');
    }
  };

  function CommentItem({ comment }) {
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState(comment.content);

    return (
      <CommentContainer>
        <CommentInfo>
          <WriterName>{comment.writerName}</WriterName>
          <Date>{formatDate(comment.createdAt)}</Date>
          {comment.mine && (
            <CommmentEditer>
              <p
                onClick={() => {
                  setEditing(true);
                }}
              >
                수정
              </p>
              <p
                onClick={() => {
                  handleDeleteComment(comment.commentId);
                }}
              >
                삭제
              </p>
            </CommmentEditer>
          ) }
        </CommentInfo>

        {editing ? (
          <Content>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button
              onClick={() => {
                handleEditComment(comment.commentId, input);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                setInput(comment.content);
                setEditing(false);
              }}
            >
              취소
            </button>
          </Content>
        ) : (
          <Content>{comment.content}</Content>
        )}
      </CommentContainer>
    );
  }

  function Pages() {
    const pageComponents = [];
    for (let i = 1; i <= pages.lastPage; i++) {
      pageComponents.push(
        <Page
          style={{ fontWeight: i === pages.currentPage && 'bold' }}
          key={i}
          onClick={() => {
            if (i !== pages.currentPage) setPages({ ...pages, currentPage: i });
          }}
        >
          {i}
        </Page>,
      );
    }
    return <PageContainer>{pageComponents}</PageContainer>;
  }

  return (
    <>
      <CommentListContainer>
        {comments.length === 0 ? (
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>작성된 댓글이 없습니다</div>
        ) : (
          comments.map((comment) => {
            return <CommentItem key={comment.commentId} comment={comment} />;
          })
        )}
      </CommentListContainer>
      <Pages />
      <InputContainer onSubmit={submitComment}>
        <CommentInput
          name='content'
          variant='outlined'
          placeholder={logined ? '' : '댓글 작성을 위해 로그인이 필요합니다'}
          disabled={!logined}
        />
        <CommentButton type='submit' disabled={!logined}>
          작성
        </CommentButton>
      </InputContainer>
    </>
  );
}

function formatDate(date) {
  var dateParts = date.split('T');
  var datePart = dateParts[0];
  var timePart = dateParts[1].split('.')[0].slice(0, 5);
  var formattedDate = datePart + ' ' + timePart;
  return formattedDate;
}
