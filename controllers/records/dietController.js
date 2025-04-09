// Version: 4.5_04_03_001
const db = require('../../config/db');

// 식단 기록 등록
exports.addDiet = (req, res) => {
  const { member_id, 식사일, 시간대, 식단내용, 칼로리, 메모, 트레이너 } = req.body;

  if (!member_id || !시간대 || !식단내용) {
    return res.status(400).json({ error: '회원, 시간대, 식단내용은 필수입니다.' });
  }

  const query = `
    INSERT INTO diet (member_id, 식사일, 시간대, 식단내용, 칼로리, 메모, 트레이너)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    member_id,
    식사일 || new Date(),
    시간대,
    식단내용,
    칼로리 || null,
    메모 || '',
    트레이너 || '',
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('식단 등록 오류:', err);
      return res.status(500).json({ error: '식단 등록 실패' });
    }
    res.json({ message: '식단이 등록되었습니다.', diet_id: result.insertId });
  });
};

// 회원별 식단 조회
exports.getDietByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM diet
    WHERE member_id = ?
    ORDER BY 식사일 DESC
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('식단 조회 오류:', err);
      return res.status(500).json({ error: '식단 조회 실패' });
    }
    res.json(results);
  });
};

// 전체 식단 조회 (필터: 날짜, 트레이너)
exports.getAllDiet = (req, res) => {
  const { date, trainer } = req.query;
  let query = 'SELECT * FROM diet WHERE 1=1';
  const values = [];

  if (date) {
    query += ' AND 식사일 = ?';
    values.push(date);
  }
  if (trainer) {
    query += ' AND 트레이너 = ?';
    values.push(trainer);
  }

  query += ' ORDER BY 식사일 DESC';

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('전체 식단 조회 오류:', err);
      return res.status(500).json({ error: '식단 목록 조회 실패' });
    }
    res.json(results);
  });
};
