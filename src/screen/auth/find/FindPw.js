import React, { useState } from "react";

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직 구현
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="current-password">현재 비밀번호:</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
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
  );
}

export default ChangePasswordPage;
