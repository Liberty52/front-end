import { useEffect, useState } from "react";
import axios from "axios";
import { resetPassword } from '../../../axios/auth/Login.js';
import './ChangePasswordPage.css';
import { useSearchParams, Redirect } from "react-router-dom";
import { useNavigate } from "react-router";

export default function ChangePasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
  
    useEffect(() => {
      const emailToken = searchParams.get("emailToken");
      const limitTime = searchParams.get("limitTime");
  
      // Check if emailToken and limitTime are valid
      // If not, set errorMessage and return
  
      // Check if the time limit has expired
      // If it has, set errorMessage and return
  
    }, [searchParams]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("새로운 비밀번호와 새로운 비밀번호 확인이 일치하지 않습니다.");
        return;
      }
  
      try {
        const emailToken = searchParams.get("emailToken");
  
        const response = await resetPassword(emailToken, newPassword);
  
        console.log(response.data);
        // 비밀번호 변경 성공 메시지 처리
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
        // 비밀번호 변경 실패 메시지 처리
        setErrorMessage("비밀번호 변경에 실패했습니다.");
      }
    };

     if (isSuccess) {
       navigate("/Login"); //메인페이지 "/"
     }

    return (
      <div className="change-password-page">
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="new-password">새로운 비밀번호:</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirm-new-password">새로운 비밀번호 확인:</label>
          <input
            type="password"
            id="confirm-new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
}
