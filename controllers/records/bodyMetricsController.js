// Version: 4.5_04_03_001
const db = require('../../config/db');

// 신체 측정 등록
exports.addMetrics = (req, res) => {
  const {
    member_id, 측정일, 체중, 체지방률, 골격근량,
    가슴둘레, 허리둘레, 엉덩이둘레, 허벅지, 종아리,
    메모, 트레이너
  } = req.body;

  if (!member_id) {
    return res.status(400).json({ error: '회원 ID는 필수입니다.' });
  }

  const query = `
    INSERT INTO body_metrics (
      member_id, 측정일, 체중, 체지방률, 골격근량,
      가슴둘레, 허리둘레, 엉덩이둘레, 허벅지, 종아리,
      메모, 트레이너
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    member_id, 측정일 || new Date(), 체중, 체지방률, 골격근량,
    가슴둘레, 허리둘레, 엉덩이둘레, 허벅지, 종아리,
    메모 || '', 트레이너 || ''
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('신체 측정 등록 오류:', err);
      return res.status(500).json({ error: '측정 등록 실패' });
    }
    res.json({ message: '신체 측정 등록 완료', metrics_id: result.insertId });
  });
};

// 회원별 측정 기록 전체 조회
exports.getMetricsByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM body_metrics
    WHERE member_id = ?
    ORDER BY 측정일 DESC
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('측정 조회 오류:', err);
      return res.status(500).json({ error: '측정 조회 실패' });
    }
    res.json(results);
  });
};

// 최근 측정 1건 조회 (통계용)
exports.getLatestMetrics = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM body_metrics
    WHERE member_id = ?
    ORDER BY 측정일 DESC
    LIMIT 1
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('최근 측정 조회 오류:', err);
      return res.status(500).json({ error: '최근 측정 조회 실패' });
    }
    res.json(results[0] || {});
  });
};
