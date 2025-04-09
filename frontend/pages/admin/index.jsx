// Version: 4.5_04_05_009

import React, { useState } from 'react';
import ReminderStats from '../../components/ReminderStats';
import ReminderMessageEditor from '../../components/ReminderMessageEditor';
import ReminderScheduleSettings from '../../components/ReminderScheduleSettings';

export default function AdminHome() {
  const [tab, setTab] = useState('reminder');

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">🔧 관리자 대시보드</h1>

      <div className="flex gap-3">
        <button
          onClick={() => setTab('reminder')}
          className={`px-4 py-2 rounded ${tab === 'reminder' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          📊 알림 통계
        </button>
        <button
          onClick={() => setTab('edit-message')}
          className={`px-4 py-2 rounded ${tab === 'edit-message' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          ✏️ 메시지 수정
        </button>
        <button
          onClick={() => setTab('schedule')}
          className={`px-4 py-2 rounded ${tab === 'schedule' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          ⏰ 예약 설정
        </button>
      </div>

      <div className="mt-6">
        {tab === 'reminder' && <ReminderStats />}
        {tab === 'edit-message' && <ReminderMessageEditor />}
        {tab === 'schedule' && <ReminderScheduleSettings />}
      </div>
    </div>
  );
}
