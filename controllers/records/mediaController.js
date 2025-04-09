// Version: 4.5_04_03_001
const db = require('../../config/db');

// 미디어 등록
exports.addMedia = (req, res) => {
  const { member_id, 유형, 설명, 링크, 파일경로, 트레이너 } = req.body;

  if (!member_id || !유형) {
    return res.status(400).json({ error: '회원 ID와 유형은 필수입니다.' });
  }

  const query = `
    INSERT INTO media (member_id, 유형, 설명, 링크, 파일경로, 트레이너)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [member_id, 유형, 설명 || '', 링크 || '', 파일경로 || '', 트레이너 || ''];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('미디어 등록 오류:', err);
      return res.status(500).json({ error: '미디어 등록 실패' });
    }
    res.json({ message: '미디어가 등록되었습니다.', media_id: result.insertId });
  });
};

// 회원별 미디어 조회
exports.getMediaByMember = (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT id, 업로드일, 유형, 설명, 링크, 파일경로, 트레이너
    FROM media
    WHERE member_id = ?
    ORDER BY 업로드일 DESC
  `;

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('미디어 조회 오류:', err);
      return res.status(500).json({ error: '미디어 조회 실패' });
    }
    res.json(results);
  });
};

// 전체 미디어 목록 (필터 가능)
exports.getAllMedia = (req, res) => {
  const { 유형 } = req.query;
  let query = `SELECT * FROM media`;
  const values = [];

  if (유형) {
    query += ' WHERE 유형 = ?';
    values.push(유형);
  }

  query += ' ORDER BY 업로드일 DESC';

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('전체 미디어 조회 오류:', err);
      return res.status(500).json({ error: '전체 미디어 조회 실패' });
    }
    res.json(results);
  });
};
