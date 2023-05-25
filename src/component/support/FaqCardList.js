import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { FAQ_MODE } from "../../constants/mode";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { FaqBody, FaqCard, FaqListWrapper, FaqTitle } from "./style/Faq";
import { Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function FaqCardList(){
  const navigate = useNavigate();
  const cards = [
    {
      icon : <Inventory2OutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "제품 가이드",
      sub : '제품 관련 문의',
      mode : FAQ_MODE.PRODUCT_GUIDE
    },
    {
      icon : <ShoppingBagOutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "주문 / 결제",
      sub : '장바구니, 결제 관련 문의',
      mode : FAQ_MODE.ORDER_PAY
    },
    {
      icon : <LocalShippingOutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "배송",
      sub : '배송 추적 및 정책 문의',
      mode : FAQ_MODE.DELIVERY
    },
    {
      icon : <ChangeCircleOutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "교환 / 반품",
      sub : '온라인 구매 제품 교환 및 반품 관련 문의',
      mode : FAQ_MODE.EXCHANGE_RETURN
    },
    {
      icon : <GppGoodOutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "제품 보증",
      sub : '제품 보증 서비스 관련 문의',
      mode : FAQ_MODE.PRODUCT_WARRANTY
    },
    {
      icon : <ListAltOutlinedIcon className={"faq-icon"} sx={{fontSize : '100px'}}/>,
      title : "기타",
      sub : '계정 및 기타 문의',
      mode : FAQ_MODE.ETC
    },



  ]

  const onCardClicked = (mode) => {
    navigate(`/faq`,{
      state:{
        mode
      }
    })
  }
  const createCard = (card) => {
    return (<FaqBody onClick={() => onCardClicked(card.mode)} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{minHeight : "300px"}}>
      {card.icon}
      <FaqTitle className={'faq-title'}>{card.title}</FaqTitle>
      <div className={'faq-sub'}>{card.sub}</div>
    </FaqBody> )
  }



  const createFAQ = () => {
    const faq = [];
    for (let i = 0; i < cards.length; i++) {
      faq.push(
        <FaqCard  variant={"outlined"} >
          {createCard(cards[i])}
        </FaqCard>
      );
    }
    return faq;
  }

  return (
    <>
      <FaqListWrapper flexDirection={"row"} spacing={2} useFlexGap flexWrap="wrap">
        {createFAQ().map(f => f)}
      </FaqListWrapper>
    </>
  )
}