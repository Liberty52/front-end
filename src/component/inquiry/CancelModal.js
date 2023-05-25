import "./CancelModal.css";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import { cancelOrder } from "../../axios/product/Inquiry";

import { useState } from "react";

export default function CancelModal({ order, closeModal }) {
  const [text, setText] = useState("");
  const isAccount = order.paymentType === "가상 계좌";

  return (
    <Modal title="주문 취소" closeModal={closeModal}>
      <form
        className="cancel-form"
        onSubmit={(e) => {
          e.preventDefault();
          const dto = {
            orderId: order.orderId,
            reason: e.target.reason.value,
          };
          if (isAccount) {
            dto["refundBank"] = e.target.refundBank.value;
            dto["refundHolder"] = e.target.refundHolder.value;
            dto["refundAccount"] = e.target.refundAccount.value;
            dto["refundPhoneNum"] = e.target.refundPhoneNum.value;
          }
          cancelOrder(dto);
          closeModal();
        }}
      >
        <div className="reason-title">취소 사유를 작성해주세요</div>
        <textarea
          className="reason-textarea"
          name="reason"
          value={text}
          required
          maxLength={1000}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        {isAccount && (
          <>
            <div className="refund-title">
              환불받을 계좌 정보를 입력해주세요
            </div>
            <Input type="text" label="은행" name="refundBank" required />
            <Input type="text" label="예금주명" name="refundHolder" required />
            <Input
              type="text"
              label="계좌번호"
              name="refundAccount"
              required
              pattern="[0-9]{1,19}"
              maxLength={19}
            />
            <Input
              type="text"
              name="refundPhoneNum"
              label="예금주 연락처"
              required
              pattern="01[0,1][0-9]{6,8}"
              maxLength={11}
              title="ex) 01012341234"
            />
          </>
        )}
        <Button text="확인"></Button>
      </form>
    </Modal>
  );
}
