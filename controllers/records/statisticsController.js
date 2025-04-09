// Version: 4.5_04_04_001
const db = require('../../config/db');

// ✅ 회원 출석 통계 조회
exports.getAttendanceStats = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT
      COUNT(*) AS totalRecords,
      SUM(CASE WHEN 상태 = '출석' THEN 1 ELSE 0 END) AS attendanceCount,
      SUM(CASE WHEN 상태 = '결석' THEN 1 ELSE 0 END) AS absenceCount,
      ROUND(
        IFNULL(SUM(CASE WHEN 상태 = '출석' THEN 1 ELSE 0 END) / COUNT(*) * 100, 0),
        1
      ) AS attendanceRate
    FROM attendance
    WHERE member_id = ?
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('📛 출석 통계 조회 오류:', err);
      return res.status(500).json({ error: '출석 통계 조회에 실패했습니다.' });
    }

    res.json(results[0]);
  });
};
