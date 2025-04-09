// Version: 4.5_04_02_010

const db = require('../../config/db');

// 회원 상태 변경
exports.updateStatus = (req, res) => {
  const memberId = req.params.id;
  const { 상태 } = req.body;

  if (!상태) {
    return res.status(400).json({ error: '변경할 상태값이 필요합니다.' });
  }

  const query = 'UPDATE members SET 상태 = ? WHERE id = ?';
  db.query(query, [상태, memberId], (err, result) => {
    if (err) {
      console.error('회원 상태 변경 오류:', err);
      return res.status(500).json({ error: '회원 상태 변경 실패' });
    }
    res.json({ message: '회원 상태가 변경되었습니다.', 상태 });
  });
};
