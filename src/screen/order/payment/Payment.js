import "./Payment.css";
import Header from "../../../component/common/Header";
import ConfirmSection from "./ConfirmSection";
import PaymentSection from "./PaymentSection";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const [section, setSection] = useState("form");
  const [deliveryInfo, setDeliveryInfo] = useState({
    receiverName: "",
    address1: "",
    address2: "",
    zipCode: "",
    receiverEmail: "",
    receiverPhoneNumber: "",
  });

  const location = useLocation();
  const locationData = { ...location.state }; // mounting_method, basic_material, add_material, add_image, quantity
  let productInfo = "";
  let productIdList = "";
  if (!locationData.checkedList) {
    productInfo = locationData;
  } else {
    productInfo = locationData.paymentValue;
    productIdList = locationData.checkedList;
  }

  if (!productIdList && !productInfo.mounting_method) {
    alert("주문 후에 결제 페이지를 사용할 수 있습니다.");
    window.location.replace("/order");
    return;
  }

  return (
    <div className="payment">
      <Header />
      {section === "form" ? (
        <PaymentSection
          setSection={setSection}
          deliveryInfo={deliveryInfo}
          setDeliveryInfo={setDeliveryInfo}
        />
      ) : (
        <ConfirmSection
          setSection={setSection}
          productInfo={productInfo}
          deliveryInfo={deliveryInfo}
          productIdList={productIdList}
        />
      )}
    </div>
  );
}
