import styled from 'styled-components';

const ReplyContainer = styled.div`
  display: none;
`;

const ReplyContent = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`;

const Author = styled.div`
  font-weight: bold;
`;

const Content = styled.div`
  margin: 2px 0;
`;

export default function ReplyContents({ id, replies }) {
  return (
    <ReplyContainer id={id}>
      {replies.map((reply) => {
        return (
          <ReplyContent key={reply.replyId}>
            <Author>{reply.authorName}</Author>
            <Content>{reply.content}</Content>
          </ReplyContent>
        );
      })}
    </ReplyContainer>
  );
}
