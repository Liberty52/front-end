import './Modal.css';
import close from '../image/icon/close.png';

/**
 * @param title 모달 제목
 * @param closeModal 모달을 닫는 함수
 * @param children 모달 내용 (Component 사이에 작성 = <Modal>여기</Modal>)
 * @returns
 */
export default function Modal(props) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <span></span>
          <span>{props.title}</span>
          {props.closeModal ? (
            <img src={close} onClick={props.closeModal} />
          ) : (
            <></>
          )}
        </div>
        {props.children}
      </div>
    </div>
  );
}
