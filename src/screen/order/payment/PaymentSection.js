import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Button from "../../../component/common/Button";
import Input from "../../../component/common/Input";
import Modal from "../../../component/common/Modal";

function AddressSearchModal(props) {
  return (
    <Modal title="주소 검색" closeModal={props.closeModal}>
      <DaumPostcode
        onComplete={(data) => {
          props.setAddress({
            address1: data.buildingName
              ? data.address + " (" + data.buildingName + ")"
              : data.address,
            zipCode: data.zonecode,
          });
          props.closeModal();
        }}
        autoClose={false}
      />
    </Modal>
  );
}

export default function PaymentSection(props) {
  const deliveryInfo = props.deliveryInfo;
  const [address, setAddress] = useState({
    address1: "",
    zipCode: "",
  });
  const [modal, setModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (address.address1) {
      props.setSection("confirm");
      props.setDeliveryInfo({
        receiverName: e.target.receiverName.value,
        address1: address.address1,
        address2: e.target.address2.value,
        receiverEmail: e.target.receiverEmail.value,
        zipCode: address.zipCode,
        receiverPhoneNumber: e.target.receiverPhoneNumber.value,
      });
    } else {
      alert("주소를 입력해주세요");
    }
  };

  return (
    <div className="payment-section">
      {modal && (
        <AddressSearchModal
          setAddress={setAddress}
          closeModal={() => setModal(false)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="payment-title">
          어디로 주문하신 제품이 배송되길 원하십니까?
        </div>
        <div className="payment-user">
          <div className="input-title">이름 및 주소 입력:</div>
          <div className="inputs">
            <Input
              type="text"
              name="receiverName"
              label="이름"
              required
              maxLength={25}
              value={deliveryInfo.receiverName}
            />
            <div className="input-button">
              <Input
                type="text"
                name="address1"
                label="주소"
                maxLength={25}
                readOnly
                value={
                  address.address1
                    ? "(" + address.zipCode + ") " + address.address1
                    : ""
                }
              />
              <Button
                type="button"
                text="주소 검색"
                onClick={() => setModal(true)}
              />
            </div>
            <Input
              type="text"
              name="address2"
              label="상세 주소"
              required
              value={deliveryInfo.address2}
            />
          </div>
        </div>
        <div className="payment-contact">
          <div className="input-title">연락처 정보:</div>
          <div className="inputs">
            <Input
              type="email"
              name="receiverEmail"
              label="이메일"
              required
              value={deliveryInfo.receiverEmail}
            />
            <Input
              type="text"
              name="receiverPhoneNumber"
              label="휴대폰 번호"
              required
              pattern="01[0,1][0-9]{6,8}"
              maxLength={11}
              title="ex) 01012341234"
              value={deliveryInfo.receiverPhoneNumber}
            />
          </div>
        </div>
        {address.address1 ? (
          <Button text="결제 페이지로 이동" />
        ) : (
          <p>주소를 입력해야만 결제 페이지로 이동할 수 있습니다.</p>
        )}
      </form>
    </div>
  );
}
