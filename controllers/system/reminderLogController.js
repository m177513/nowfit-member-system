// Version: 4.5_04_04_004

const db = require('../../config/db');

// 알림 발송 로그 저장
exports.saveLog = (memberId, monthsAfter, message, status = '성공') => {
  const sql = `INSERT INTO reminder_logs (member_id, months_after, message, status) VALUES (?, ?, ?, ?)`;
  db.query(sql, [memberId, monthsAfter, message, status], (err) => {
    if (err) console.error('[알림 로그 저장 오류]', err);
  });
};

// 관리자용: 발송 로그 전체 조회
exports.getLogs = (req, res) => {
  const sql = `
    SELECT rl.*, m.name, m.phone
    FROM reminder_logs rl
    JOIN members m ON rl.member_id = m.id
    ORDER BY rl.sent_at DESC
    LIMIT 200
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'DB 오류', detail: err });
    res.json(results);
  });
};
