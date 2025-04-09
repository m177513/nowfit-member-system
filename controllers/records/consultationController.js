// Version: 4.5_04_03_001
const db = require('../../config/db');

// 상담 등록
exports.addConsultation = (req, res) => {
  const { member_id, 상담일, 상담유형, 내용, 트레이너, 메모 } = req.body;

  if (!member_id || !상담유형 || !내용) {
    return res.status(400).json({ error: '회원 ID, 상담유형, 내용은 필수입니다.' });
  }

  const query = `
    INSERT INTO consultations (member_id, 상담일, 상담유형, 내용, 트레이너, 메모)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    member_id,
    상담일 || new Date(),
    상담유형,
    내용,
    트레이너 || '',
    메모 || '',
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('상담 등록 오류:', err);
      return res.status(500).json({ error: '상담 등록 실패' });
    }
    res.json({ message: '상담이 등록되었습니다.', consultation_id: result.insertId });
  });
};

// 회원별 상담 내역 조회
exports.getConsultationsByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT * FROM consultations
    WHERE member_id = ?
    ORDER BY 상담일 DESC
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('상담 조회 오류:', err);
      return res.status(500).json({ error: '상담 조회 실패' });
    }
    res.json(results);
  });
};

// 전체 상담 조회 (상담유형 필터 포함)
exports.getAllConsultations = (req, res) => {
  const { 상담유형 } = req.query;
  let query = `SELECT * FROM consultations`;
  const values = [];

  if (상담유형) {
    query += ' WHERE 상담유형 = ?';
    values.push(상담유형);
  }

  query += ' ORDER BY 상담일 DESC';

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('전체 상담 조회 오류:', err);
      return res.status(500).json({ error: '상담 목록 조회 실패' });
    }
    res.json(results);
  });
};
