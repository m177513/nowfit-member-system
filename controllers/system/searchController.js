// Version: 4.5_04_02_012

const db = require('../../config/db');

// 회원 검색 (이름, 전화번호, 회원번호로 검색 가능)
exports.searchMembers = (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: '검색어가 필요합니다.' });
  }

  const query = `
    SELECT * FROM members
    WHERE 회원명 LIKE ? OR 전화번호 LIKE ? OR 회원번호 LIKE ?
    ORDER BY id DESC
  `;
  const value = `%${keyword}%`;

  db.query(query, [value, value, value], (err, results) => {
    if (err) {
      console.error('회원 검색 오류:', err);
      return res.status(500).json({ error: '회원 검색 실패' });
    }
    res.json(results);
  });
};
