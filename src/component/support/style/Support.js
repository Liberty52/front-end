import styled from 'styled-components';

export const Container = styled.div`
  margin: 5% 10%;
  min-height: 50vh;
`;
export const SupportHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 20px;
  @media (max-width: 990px) {
    justify-content: center;
    align-items: center;
  }
`;
export const SupportHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 32px;
  margin-bottom: 10px;
`;
export const SupportHeaderItemList = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;
export const SupportHeaderItem = styled.div`
  margin: 0 5px;
  font-size: 16px;
  border-bottom: ${(props) => (props.name === props.mode ? '1px solid #9A845B' : 'none')};
  cursor: pointer;
  color: ${(props) => (props.name === props.mode ? 'black' : 'rgba(0,0,0,0.4)')};
  transition: color 0.5s;
  padding: 5px 0;
  :hover {
    color: #9a845b;
  }
`;
export const SupportBodyWrapper = styled.div``;
