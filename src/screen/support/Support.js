import { useState } from 'react';
import Warranty from '../../component/support/Warranty';
import NoticeList from '../../component/support/NoticeList';
import {
  Container,
  SupportBodyWrapper,
  SupportHeaderItem,
  SupportHeaderItemList,
  SupportHeaderTitle,
  SupportHeaderWrapper,
} from '../../component/support/style/Support';
import NoticeDetail from '../../component/support/NoticeDetail';
import uuid from 'react-uuid';
import Footer from '../../component/common/Footer';
import FaqCardList from '../../component/support/FaqCardList';
import Header from '../../component/common/Header';
import { SUPPORT_MODE } from '../../constants/mode';

export default function Support() {
  const [mode, setMode] = useState(SUPPORT_MODE.FAQ);
  const [noticeId, setNoticeId] = useState('');
  const HeaderItems = [
    { name: SUPPORT_MODE.FAQ, onClick: () => changeMode(SUPPORT_MODE.FAQ) },
    // {name : "제품 보증", onClick : () => changeMode("제품 보증")},
    { name: SUPPORT_MODE.NOTICE, onClick: () => changeMode(SUPPORT_MODE.NOTICE) },
  ];

  const changeMode = (name) => {
    setMode(name);
    setNoticeId('');
  };

  const createBody = () => {
    switch (mode) {
      case SUPPORT_MODE.FAQ:
        return <FaqCardList />;
      case SUPPORT_MODE.WARRANTY:
        return <Warranty />;
      case SUPPORT_MODE.NOTICE:
        return createNoticeBody();
    }
  };

  const clearNoticeId = () => {
    setNoticeId('');
  };
  const createNoticeBody = () => {
    if (noticeId === '') return <NoticeList setNoticeId={setNoticeId} />;
    return <NoticeDetail clearNoticeId={clearNoticeId} noticeId={noticeId} />;
  };

  return (
    <>
      <Header />
      <Container>
        <SupportHeaderWrapper>
          <SupportHeaderTitle>고객 지원</SupportHeaderTitle>
          <SupportHeaderItemList>
            {HeaderItems.map((i) => (
              <SupportHeaderItem key={uuid()} name={i.name} mode={mode} onClick={i.onClick}>
                {i.name}
              </SupportHeaderItem>
            ))}
          </SupportHeaderItemList>
        </SupportHeaderWrapper>
        <SupportBodyWrapper>{createBody()}</SupportBodyWrapper>
      </Container>
      <Footer />
    </>
  );
}
