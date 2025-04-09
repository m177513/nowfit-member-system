// Version: 4.5_04_03_010

const db = require('../../config/db');

// 특정 PT 수업 상세 정보 조회
exports.getPTDetail = (req, res) => {
  const scheduleId = req.params.id;

  const query = `
    SELECT s.*, m.회원명
    FROM ptschedules s
    JOIN members m ON s.회원id = m.id
    WHERE s.id = ?
  `;

  db.query(query, [scheduleId], (err, results) => {
    if (err) {
      console.error('PT 상세 조회 오류:', err);
      return res.status(500).json({ error: '상세 정보 조회 실패' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: '수업 정보가 없습니다.' });
    }

    res.json(results[0]);
  });
};
