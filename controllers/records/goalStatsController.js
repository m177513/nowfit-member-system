// Version: 4.5_04_04_004
const db = require('../../config/db');

// ✅ 회원 운동 목표 달성률 통계
exports.getGoalStats = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT
      g.운동명 AS 운동명,
      g.목표횟수 AS 목표,
      IFNULL(SUM(e.횟수), 0) AS 실제수행,
      ROUND(IFNULL(SUM(e.횟수) / g.목표횟수 * 100, 0), 1) AS 달성률
    FROM exercise_goals g
    LEFT JOIN exercise e
      ON g.운동명 = e.운동명 AND g.member_id = e.member_id
    WHERE g.member_id = ?
    GROUP BY g.운동명, g.목표횟수
    ORDER BY 달성률 DESC
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('📛 운동 목표 통계 오류:', err);
      return res.status(500).json({ error: '운동 목표 통계 조회 실패' });
    }

    res.json(results);
  });
};
