// Version: 4.5_04_03_001
const db = require('../../config/db');

// PT권 등록
exports.addPass = (req, res) => {
  const { member_id, 구매일, 총횟수, 만료일, 트레이너, 메모 } = req.body;

  if (!member_id || !총횟수) {
    return res.status(400).json({ error: '회원과 총횟수는 필수입니다.' });
  }

  const query = `
    INSERT INTO pt_passes (member_id, 구매일, 총횟수, 사용횟수, 잔여횟수, 만료일, 상태, 트레이너, 메모)
    VALUES (?, ?, ?, 0, ?, ?, '사용중', ?, ?)
  `;
  const values = [
    member_id,
    구매일 || new Date(),
    총횟수,
    총횟수, // 초기 잔여횟수 = 총횟수
    만료일 || null,
    트레이너 || '',
    메모 || ''
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('PT권 등록 오류:', err);
      return res.status(500).json({ error: 'PT권 등록 실패' });
    }
    res.json({ message: 'PT권이 등록되었습니다.', pass_id: result.insertId });
  });
};

// 회원별 PT권 목록
exports.getPassesByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM pt_passes
    WHERE member_id = ?
    ORDER BY 구매일 DESC
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('PT권 조회 오류:', err);
      return res.status(500).json({ error: '조회 실패' });
    }
    res.json(results);
  });
};

// 전체 목록 필터 (트레이너 or 상태)
exports.getAllPasses = (req, res) => {
  const { trainer, status } = req.query;
  let query = 'SELECT * FROM pt_passes WHERE 1=1';
  const values = [];

  if (trainer) {
    query += ' AND 트레이너 = ?';
    values.push(trainer);
  }
  if (status) {
    query += ' AND 상태 = ?';
    values.push(status);
  }

  query += ' ORDER BY 구매일 DESC';

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('PT권 전체 조회 오류:', err);
      return res.status(500).json({ error: '전체 조회 실패' });
    }
    res.json(results);
  });
};
