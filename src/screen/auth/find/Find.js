import Button from '../../../component/Button';
import './Find.css';
import React, { useState } from 'react';
import Modal from 'react-modal';

export default function Find() {
  const [isFindIdOpen, setIsFindIdOpen] = useState(false);
  const [isFindPwOpen, setIsFindPwOpen] = useState(false);

  const modalStyle = {
    content: {
      width: '500px',
      height: '33%',
      margin: 'auto',
    },
  };

  const [idInput, setIdInput] = useState('');
  const [pwInput, setPwInput] = useState('');

  const handleIdInput = (event) => {
    setIdInput(event.target.value);
  };

  const handlePwInput = (event) => {
    setPwInput(event.target.value);
  };

  const handleSubmitId = () => {
    console.log(`아이디 입력값: ${idInput}`);
    setIdInput('');
    setIsFindIdOpen(false);
  };

  const handleSubmitPw = () => {
    console.log(`비밀번호 입력값: ${pwInput}`);
    setPwInput('');
    setIsFindPwOpen(false);
  };

  return (
    <div className='wrap'>
      <div className="Find">
        <Button href='#' onClick={() => setIsFindIdOpen(true)} text="아이디 찾기" />
        <Button href='#' onClick={() => setIsFindPwOpen(true)} text="비밀번호 찾기" />
      </div>

      <Modal
        isOpen={isFindIdOpen}
        onRequestClose={() => setIsFindIdOpen(false)}
        contentLabel="아이디 찾기 모달"
        style={modalStyle}
      >
        <h2>아이디 찾기 모달</h2>
        <input type="text" value={idInput} onChange={handleIdInput} />
        <input type="text" value={pwInput} onChange={handlePwInput} />
        <Button href='#' onClick={handleSubmitId} text="전송" />
        <Button href='#' onClick={() => setIsFindIdOpen(false)} text="닫기" />
      </Modal>

      <Modal
        isOpen={isFindPwOpen}
        onRequestClose={() => setIsFindPwOpen(false)}
        contentLabel="비밀번호 찾기 모달"
        style={modalStyle}
      >
        <h2>비밀번호 찾기 모달</h2>
        <input type="text" value={idInput} onChange={handleIdInput} />
        <input type="text" value={pwInput} onChange={handlePwInput} />
        <Button href='#' onClick={handleSubmitPw} text="전송" />
        <Button href='#' onClick={() => setIsFindPwOpen(false)} text="닫기" />
      </Modal>
    </div>
  );
}