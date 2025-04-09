// Version: 4.5_04_03_003

const db = require('../../config/db');

// 회원권 만료 알림용 조회 (7/3/1일 남은 회원)
exports.getExpiringMemberships = (req, res) => {
  const today = new Date();
  const targetDays = [7, 3, 1];
  const conditions = targetDays
    .map(day => `DATEDIFF(종료일, CURDATE()) = ${day}`)
    .join(' OR ');

  const query = `
    SELECT id, 회원명, 종료일, DATEDIFF(종료일, CURDATE()) AS days_left
    FROM members
    WHERE 상태 = '활동 중' AND (${conditions})
    ORDER BY days_left ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('회원권 알림 오류:', err);
      return res.status(500).json({ error: '회원권 만료 정보 조회 실패' });
    }
    res.json(results);
  });
};
