// Version: 4.5_04_03_001

const db = require('../../config/db');

// 회원 상태별 통계
exports.getMemberStatusStats = (req, res) => {
  const query = `
    SELECT 상태, COUNT(*) AS count
    FROM members
    GROUP BY 상태
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('회원 상태 통계 오류:', err);
      return res.status(500).json({ error: '통계 조회 실패' });
    }

    // 통계 포맷 정리
    const formatted = {
      전체: results.reduce((sum, row) => sum + row.count, 0),
      활동중: 0,
      휴면: 0,
      탈퇴: 0
    };

    results.forEach(row => {
      if (row.상태 === '활동 중') formatted.활동중 = row.count;
      else if (row.상태 === '휴면') formatted.휴면 = row.count;
      else if (row.상태 === '탈퇴') formatted.탈퇴 = row.count;
    });

    res.json(formatted);
  });
};
