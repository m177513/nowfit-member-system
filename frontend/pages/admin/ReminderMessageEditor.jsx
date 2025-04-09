// Version: 4.5_04_05_003
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderMessageEditor = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('/api/reminder-settings')
      .then(res => setMessage(res.data.message))
      .catch(() => setStatus('불러오기 실패'));
  }, []);

  const saveMessage = async () => {
    try {
      await axios.put('/api/reminder-settings', { message });
      setStatus('✅ 저장 완료!');
    } catch (err) {
      console.error(err);
      setStatus('❌ 저장 실패');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">✏️ 리마인더 메시지 편집</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full h-40 p-2 border rounded mb-2"
      />
      <button
        onClick={saveMessage}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        저장
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default ReminderMessageEditor;
