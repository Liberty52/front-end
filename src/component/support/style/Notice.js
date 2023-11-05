import styled from "styled-components";

export const NoticeListWrapper = styled.div``;
export const NoticeItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid black;
  :hover {
    cursor: pointer;
  }
`;
export const NoticeTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;
export const NoticeItemDate = styled.div`
  color: rgba(0, 0, 0, 0.4);
`;
export const NoticeDetailHeader = styled.div``;
export const NoticeDetailTitle = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  @media (max-width: 500px) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
export const NoticeDetailCreatedAt = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  @media (max-width: 500px) {
    border-bottom: none;
  }
`;

export const MoveListAnchor = styled.span`
  margin-right: 10px;
  :hover {
    cursor: pointer;
  }
`;

// Notice Comment --
export const CommentListContainer = styled.div`
  padding: 20px 0px 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
`;

export const CommentContainer = styled.div`
  margin-bottom: 15px;
`;

export const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

export const CommentInput = styled.input`
  width: 95%; /* 구식 브라우저를 위한 대비책(fallback) */
  width: -webkit-calc(100% - 55px); /* for Chrome, Safari */
  width: -moz-calc(100% - 55px); /* for Firefox */
  width: calc(100% - 55px); /* for IE */
  height: 35px;
  padding: 6px 10px;
  border: 1px solid gray;
  border-radius: 5px 0 0 5px;

  :focus-visible {
    outline: 1.2px solid gray;
  }
`;

export const CommentButton = styled.button`
  width: 55px;
  height: 35px;
  border: 1px solid gray;
  padding: 7px 10px;
  border-radius: 0 5px 5px 0;
  :hover {
    outline: 1.2px solid gray;
  }
  :disabled {
    outline: none;
  }
`;

export const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;
export const WriterName = styled.span`
  margin-right: 10px;
`;
export const Date = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
`;
export const Content = styled.div``;
