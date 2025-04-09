// Version: 4.5_04_03_008

const db = require('../../config/db');

// 목표 등록
exports.setGoal = (req, res) => {
  const { 회원id, 운동명, 목표무게, 목표횟수 } = req.body;

  const query = `
    INSERT INTO exercise_goals (회원id, 운동명, 목표무게, 목표횟수, 설정일, 달성여부)
    VALUES (?, ?, ?, ?, NOW(), '미달성')
  `;

  db.query(query, [회원id, 운동명, 목표무게, 목표횟수], (err, result) => {
    if (err) {
      console.error('목표 등록 오류:', err);
      return res.status(500).json({ error: '운동 목표 등록 실패' });
    }
    res.json({ message: '운동 목표 등록 완료', goal_id: result.insertId });
  });
};

// 운동 기록과 비교
exports.compareWithRecords = (req, res) => {
  const { 회원id, 운동명 } = req.params;

  const query = `
    SELECT e.무게, e.횟수, g.목표무게, g.목표횟수, 
      CASE 
        WHEN e.무게 >= g.목표무게 AND e.횟수 >= g.목표횟수 THEN '달성'
        ELSE '미달성'
      END AS 달성상태
    FROM exercise_records e
    JOIN exercise_goals g ON e.회원id = g.회원id AND e.운동명 = g.운동명
    WHERE e.회원id = ? AND e.운동명 = ?
    ORDER BY e.id DESC LIMIT 1
  `;

  db.query(query, [회원id, 운동명], (err, results) => {
    if (err) {
      console.error('운동 비교 오류:', err);
      return res.status(500).json({ error: '비교 실패' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: '운동 기록 또는 목표가 없습니다.' });
    }

    res.json(results[0]);
  });
};
