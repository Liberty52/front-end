import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../component/Header";
import {
  Container,
  SupportBodyWrapper,
  SupportHeaderItem,
  SupportHeaderItemList,
  SupportHeaderTitle,
  SupportHeaderWrapper
} from "../../component/support/style/Support";
import uuid from "react-uuid";
import Footer from "../../component/Footer";
import { FAQ_MODE } from "../../constants/mode";
import Accordion from "../../component/support/Accordion";
import { changeFaq, deliveryFaq, etcFaq, orderPayFaq, ProductGuideFaq, warrantyFaq } from "../../constants/faq";


export default function Faq() {

  const [mode, setMode] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const HeaderItems = [
    { name: "제품 가이드", value: FAQ_MODE.PRODUCT_GUIDE, onClick: () => onModeChanged(FAQ_MODE.PRODUCT_GUIDE) },
    { name: "주문 / 결제", value: FAQ_MODE.ORDER_PAY, onClick: () => onModeChanged(FAQ_MODE.ORDER_PAY) },
    { name: "배송", value: FAQ_MODE.DELIVERY, onClick: () => onModeChanged(FAQ_MODE.DELIVERY) },
    { name: "교환 / 반품", value: FAQ_MODE.EXCHANGE_RETURN, onClick: () => onModeChanged(FAQ_MODE.EXCHANGE_RETURN) },
    { name: "제품 보증", value: FAQ_MODE.PRODUCT_WARRANTY, onClick: () => onModeChanged(FAQ_MODE.PRODUCT_WARRANTY) },
    { name: "기타", value: FAQ_MODE.ETC, onClick: () => onModeChanged(FAQ_MODE.ETC) }
  ];



  const [faqList , setFaqList] = useState(ProductGuideFaq);
  const location = useLocation();
  useEffect(() => {
    if(location.state?.mode === undefined)
      setBody(FAQ_MODE.PRODUCT_GUIDE)
    else
      setBody(location.state.mode)
  },[])

  const onModeChanged = (m) => {
    setBody(m);
  }

  function setBody(m) {
    switch (m) {
      case FAQ_MODE.PRODUCT_GUIDE :
        setFaqList(ProductGuideFaq);
        setMode(FAQ_MODE.PRODUCT_GUIDE);
        break;
      case FAQ_MODE.ORDER_PAY:
        setFaqList(orderPayFaq);
        setMode(FAQ_MODE.ORDER_PAY);
        break;
      case FAQ_MODE.DELIVERY:
        setFaqList(deliveryFaq);
        setMode(FAQ_MODE.DELIVERY);
        break;
      case FAQ_MODE.EXCHANGE_RETURN:
        setFaqList(changeFaq);
        setMode(FAQ_MODE.EXCHANGE_RETURN);
        break;

      case FAQ_MODE.PRODUCT_WARRANTY:
        setFaqList(warrantyFaq);
        setMode(FAQ_MODE.PRODUCT_WARRANTY);
        break;

      case FAQ_MODE.ETC:
        setFaqList(etcFaq);
        setMode(FAQ_MODE.ETC);
        break;
    }
    setCurrentTitle("");
  }
  return (
    <>
      <Header />
      <Container>
        <SupportHeaderWrapper>
          <SupportHeaderTitle>FAQ</SupportHeaderTitle>
          <SupportHeaderItemList>
            {HeaderItems.map(i =>
              <SupportHeaderItem key={uuid()} name={i.value} mode={mode}
                                 onClick={i.onClick}>{i.name}</SupportHeaderItem>)}
          </SupportHeaderItemList>
        </SupportHeaderWrapper>
        <SupportBodyWrapper>
          {faqList.map(p => <Accordion onClick={setCurrentTitle}
                                               currentTitle={currentTitle}
                                               summary={p.title}>
            <p>
              {p.content}
            </p>
          </Accordion>)}
        </SupportBodyWrapper>
      </Container>
      <Footer />
    </>
  );
}