import styled, { keyframes, css } from 'styled-components';
import { Card, Stack } from '@mui/joy';

export const FaqListWrapper = styled(Stack)`
  @media (max-width: 1080px) {
    justify-content: center;
  }
`;

export const FaqCard = styled(Card)`
  width: calc(33% - 16px);

  @media (max-width: 1080px) {
    width: calc(50% - 16px);
  }

  @media (max-width: 500px) {
    width: calc(100% - 16px);
  }
`;

export const FaqTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const FaqBody = styled(Stack)`
  :hover {
    cursor: pointer;
  }

  :hover .faq-icon {
    font-size: 150px;
    transition: font-size 1s;
  }

  :hover .faq-title {
    font-size: 26px;
    transition: font-size 1s;
  }

  :hover .faq-sub {
    font-size: 18px;
    transition: font-size 1s;
  }
`;

export const AccordionContent = styled.div`
  transition: 0.4s ease;
  margin-top: ${(props) => `-${props.contentHeight}px`};
  opacity: 0;
  width: 100%;
`;

export const AccordionArrow = styled.div`
  transition: transform 0.3s;
  width: 10px;
  height: 10px;
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  transform: rotate(135deg);
`;

export const AccordionWrapper = styled.div`
  border-bottom: 1px solid #e5e8eb;
  padding: 20px 0;
  width: 100%;
  transition: 0.4s ease;

  @media (max-width: 800px) {
    padding: 3% 0;
  }
`;
export const AccordionContentWrapper = styled.div`
  overflow: hidden;
  visibility: hidden;
  height: 0;
  transition-duration: 1s;
  transition-property: height, visibility;
  transition-timing-function: ease;
  ${(props) =>
    props.open &&
    css`
      height: inherit;
      visibility: visible;
    `};
  ${AccordionContent} {
    ${(props) =>
      props.open &&
      css`
        margin-top: 20px;
        opacity: 1;
      `}
  }
`;

export const AccordionDetails = styled.details`
  cursor: pointer;
  //padding: 5% 0;

  ${AccordionArrow} {
    ${(props) =>
      props.open &&
      css`
        transform: rotate(315deg);
      `}
  }
`;

export const AccordionTitleWrapper = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AccTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
