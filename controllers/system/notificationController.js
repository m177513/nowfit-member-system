// Version: 4.5_04_03_012

const db = require('../../config/db');

// 회원권/라커 만료 임박자 조회
exports.getExpiringMembers = (req, res) => {
  const query = `
    SELECT id, 회원명, 종료일, 라커만료일,
      DATEDIFF(종료일, CURDATE()) AS 회원권Dday,
      DATEDIFF(라커만료일, CURDATE()) AS 라커Dday
    FROM members
    WHERE
      (DATEDIFF(종료일, CURDATE()) IN (7, 3, 1) OR
       DATEDIFF(라커만료일, CURDATE()) IN (7, 3, 1))
      AND 상태 = '활동 중'
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('만료 알림 오류:', err);
      return res.status(500).json({ error: '알림 대상 조회 실패' });
    }
    res.json(results);
  });
};
