// Version: 4.5_04_05_004

const db = require('../../config/db');
const { saveLog } = require('./reminderLogController');

// 설정 불러오기
exports.getSettings = (req, res) => {
  db.query('SELECT * FROM reminder_settings LIMIT 1', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0] || {});
  });
};

// 설정 저장
exports.saveSettings = (req, res) => {
  const { enabled, message, schedule } = req.body;
  const scheduleJSON = JSON.stringify(schedule);

  const sql = `REPLACE INTO reminder_settings (id, enabled, message, schedule) VALUES (1, ?, ?, ?)`;
  db.query(sql, [enabled, message, scheduleJSON], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: '설정이 저장되었습니다.' });
  });
};

// 수동 발송 기능
exports.sendManual = (req, res) => {
  db.query('SELECT * FROM members WHERE status = "expired"', (err, members) => {
    if (err) return res.status(500).json({ error: err });

    members.forEach((m) => {
      const msg = `운동 끝나신지 오래되셨습니다. 다시 시작하셔야죠!`;
      console.log(`[수동 발송] ${m.name} (${m.phone}): ${msg}`);
      saveLog(m.id, 0, msg); // 0개월 수동 로그 저장
    });

    res.json({ message: `${members.length}명에게 수동 메시지를 전송했습니다.` });
  });
};
