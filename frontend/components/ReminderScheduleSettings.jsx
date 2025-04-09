// ReminderScheduleSettings.jsx
import React, { useState } from 'react';

const ReminderScheduleSettings = () => {
  const [schedule, setSchedule] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSave = () => {
    // Save schedule logic here
    console.log('Reminder schedule saved:', schedule, 'Active:', isActive);
  };

  return (
    <div className="schedule-settings">
      <h2>알림 예약 설정</h2>
      <input
        type="text"
        value={schedule}
        onChange={handleScheduleChange}
        placeholder="예약 시간을 입력하세요"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={toggleActive}
          />
          활성화
        </label>
      </div>
      <div>
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default ReminderScheduleSettings;
