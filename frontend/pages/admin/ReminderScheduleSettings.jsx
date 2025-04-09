// Version: 4.5_04_05_005
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReminderScheduleSettings = () => {
  const [enabled, setEnabled] = useState(true);
  const [schedule, setSchedule] = useState({
    day: 'Monday',
    hour: '10',
    minute: '00',
    repeat: 'monthly'
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('/api/reminder-settings')
      .then(res => {
        if (res.data.enabled !== undefined) setEnabled(res.data.enabled);
        if (res.data.schedule) setSchedule(JSON.parse(res.data.schedule));
      })
      .catch(() => setStatus('불러오기 실패'));
  }, []);

  const handleChange = (field, value) => {
    setSchedule({ ...schedule, [field]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/reminder-settings', { enabled, message: '', schedule });
      setStatus('✅ 저장 완료!');
    } catch (err) {
      console.error(err);
      setStatus('❌ 저장 실패');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">⏰ 예약 발송 설정</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">예약 발송 사용:</label>
        <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>요일:</label>
          <select className="w-full border p-2" value={schedule.day} onChange={(e) => handleChange('day', e.target.value)}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div>
          <label>시간:</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={schedule.hour}
              onChange={(e) => handleChange('hour', e.target.value)}
              className="w-20 border p-1"
              min="0"
              max="23"
            />
            <input
              type="number"
              value={schedule.minute}
              onChange={(e) => handleChange('minute', e.target.value)}
              className="w-20 border p-1"
              min="0"
              max="59"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label>반복:</label>
        <select className="w-full border p-2" value={schedule.repeat} onChange={(e) => handleChange('repeat', e.target.value)}>
          <option value="monthly">매달</option>
          <option value="weekly">매주</option>
          <option value="daily">매일</option>
        </select>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
        저장
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default ReminderScheduleSettings;
