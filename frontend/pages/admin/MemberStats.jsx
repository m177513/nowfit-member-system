// Version: 4.5_04_05_001

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberStats = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('/api/reminders/logs');
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">회원별 리마인더 통계</h2>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">회원 ID</th>
              <th className="border px-2 py-1">메시지 내용</th>
              <th className="border px-2 py-1">성공 여부</th>
              <th className="border px-2 py-1">발송 시각</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="border px-2 py-1">{log.memberId || '-'}</td>
                <td className="border px-2 py-1">{log.message}</td>
                <td className="border px-2 py-1">{log.success ? '✅' : '❌'}</td>
                <td className="border px-2 py-1">{new Date(log.sent_at).toLocaleString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MemberStats;
