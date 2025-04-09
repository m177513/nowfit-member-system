// Version: 4.5_04_02_008

const db = require('../../config/db');

// 포인트 수정 (증가 또는 차감)
exports.updatePoints = (req, res) => {
  const memberId = req.params.id;
  const { amount } = req.body;

  if (typeof amount !== 'number') {
    return res.status(400).json({ error: '포인트는 숫자여야 합니다.' });
  }

  const query = `UPDATE members SET 포인트 = 포인트 + ? WHERE id = ?`;

  db.query(query, [amount, memberId], (err, result) => {
    if (err) {
      console.error('포인트 수정 오류:', err);
      return res.status(500).json({ error: '포인트 변경에 실패했습니다.' });
    }
    res.json({ message: '포인트가 업데이트되었습니다.' });
  });
};
