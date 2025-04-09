// Version: 4.5_04_03_merged
const db = require('../../config/db');

// PT 수업 등록 + 잔여횟수 차감
exports.createSchedule = (req, res) => {
  const { 회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모 } = req.body;

  if (!회원id || !강사 || !수업일 || !시작시간 || !종료시간) {
    return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
  }

  db.query('SELECT 잔여횟수 FROM members WHERE id = ?', [회원id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ error: '회원 정보를 찾을 수 없습니다.' });
    }

    const 잔여횟수 = result[0].잔여횟수;
    if (잔여횟수 <= 0) {
      return res.status(400).json({ error: '잔여횟수가 부족합니다.' });
    }

    const insertQuery = `
      INSERT INTO ptschedules (회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모];

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('PT 등록 오류:', err);
        return res.status(500).json({ error: 'PT 등록 실패' });
      }

      db.query('UPDATE members SET 잔여횟수 = 잔여횟수 - 1 WHERE id = ?', [회원id]);
      res.json({ message: 'PT 수업 등록 완료', schedule_id: result.insertId });
    });
  });
};

// PT 스케줄 삭제 (잔여횟수 복원)
exports.deleteSchedule = (req, res) => {
  const id = req.params.id;

  // 먼저 회원 ID 확인
  db.query('SELECT 회원id FROM ptschedules WHERE id = ?', [id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: '해당 스케줄을 찾을 수 없습니다.' });
    }

    const 회원id = result[0].회원id;

    // 삭제
    db.query('DELETE FROM ptschedules WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('삭제 오류:', err);
        return res.status(500).json({ error: '삭제 실패' });
      }

      // 잔여횟수 복원
      db.query('UPDATE members SET 잔여횟수 = 잔여횟수 + 1 WHERE id = ?', [회원id]);
      res.json({ message: 'PT 스케줄 삭제 + 잔여횟수 복원 완료' });
    });
  });
};

// 전체 스케줄 조회 (트레이너 필터 지원)
exports.getAllSchedules = (req, res) => {
  const { trainer } = req.query;
  let query = 'SELECT * FROM ptschedules';
  const values = [];

  if (trainer) {
    query += ' WHERE 강사 = ?';
    values.push(trainer);
  }

  query += ' ORDER BY 수업일 DESC, 시작시간 ASC';

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('스케줄 조회 오류:', err);
      return res.status(500).json({ error: '스케줄 조회 실패' });
    }
    res.json(results);
  });
};
