// Version: 4.5_04_03_001
const db = require('../../config/db');

// 회원별 요약 통계 조회
exports.getSummaryByMember = (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT * FROM summary_stats
    WHERE member_id = ?
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('요약 통계 조회 오류:', err);
      return res.status(500).json({ error: '요약 통계 조회 실패' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: '요약 통계 없음' });
    }

    res.json(results[0]);
  });
};

// 요약 통계 수동 갱신
exports.updateSummary = (req, res) => {
  const { member_id, 총출석수, PT수업수, 운동기록수, 식단기록수 } = req.body;

  if (!member_id) {
    return res.status(400).json({ error: '회원 ID는 필수입니다.' });
  }

  const query = `
    INSERT INTO summary_stats (member_id, 총출석수, PT수업수, 운동기록수, 식단기록수, 마지막업데이트)
    VALUES (?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE
      총출석수 = VALUES(총출석수),
      PT수업수 = VALUES(PT수업수),
      운동기록수 = VALUES(운동기록수),
      식단기록수 = VALUES(식단기록수),
      마지막업데이트 = NOW()
  `;

  const values = [member_id, 총출석수 || 0, PT수업수 || 0, 운동기록수 || 0, 식단기록수 || 0];

  db.query(query, values, (err) => {
    if (err) {
      console.error('요약 통계 갱신 오류:', err);
      return res.status(500).json({ error: '요약 통계 갱신 실패' });
    }

    res.json({ message: '요약 통계가 갱신되었습니다.' });
  });
};
