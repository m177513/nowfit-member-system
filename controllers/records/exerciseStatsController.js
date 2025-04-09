// Version: 4.5_04_04_002
const db = require('../../config/db');

// ✅ 회원별 운동 루틴 분석
exports.getExerciseStats = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT
      운동명 AS exercise,
      SUM(횟수) AS totalReps
    FROM exercise
    WHERE member_id = ?
    GROUP BY 운동명
    ORDER BY totalReps DESC
    LIMIT 10
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('📛 운동 통계 오류:', err);
      return res.status(500).json({ error: '운동 통계 조회 실패' });
    }

    res.json(results);
  });
};
