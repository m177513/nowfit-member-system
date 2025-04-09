// ReminderMessageEditor.jsx
import React, { useState } from 'react';

const ReminderMessageEditor = () => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSave = () => {
    // Save the message logic here
    console.log('Reminder message saved:', message);
  };

  return (
    <div className="message-editor">
      <h2>알림 메시지 수정</h2>
      <textarea
        value={message}
        onChange={handleInputChange}
        rows="4"
        cols="50"
        placeholder="알림 메시지를 입력하세요"
      ></textarea>
      <div>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default ReminderMessageEditor;
