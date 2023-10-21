import { useEffect, useRef, useState } from 'react';
import {
  AccordionWrapper,
  AccordionArrow,
  AccordionContent,
  AccordionContentWrapper,
  AccordionDetails,
  AccordionTitleWrapper,
  AccTitle,
} from './style/Faq';

function Accordion(props) {
  const { summary, children, onClick, currentTitle } = props;
  const contentRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setContentHeight(contentRef?.current?.clientHeight ?? 0);
  }, []);

  const open = summary === currentTitle;

  const onAccordionClicked = () => {
    if (currentTitle === summary) {
      onClick('');
    } else onClick(summary);
  };

  return (
    <>
      <AccordionWrapper open={open}>
        <AccordionDetails open={open} onClick={onAccordionClicked}>
          <AccordionTitleWrapper>
            <AccTitle>{summary}</AccTitle>
            <AccordionArrow></AccordionArrow>
          </AccordionTitleWrapper>
        </AccordionDetails>
        <AccordionContentWrapper open={open}>
          <AccordionContent contentHeight={contentHeight} ref={contentRef}>
            {children}
          </AccordionContent>
        </AccordionContentWrapper>
      </AccordionWrapper>
    </>
  );
}

export default Accordion;
