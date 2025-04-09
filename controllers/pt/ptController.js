// Version: 4.5_04_02_005

const db = require('../../config/db');

// PT 수업 등록 + 잔여횟수 차감
exports.createSchedule = (req, res) => {
  const { 회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모 } = req.body;

  db.query('SELECT 잔여횟수 FROM members WHERE id = ?', [회원id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(400).json({ error: '회원 정보 조회 실패' });
    }
    const remaining = rows[0].잔여횟수;
    if (remaining <= 0) {
      return res.status(400).json({ error: '잔여횟수가 부족하여 등록할 수 없습니다.' });
    }

    const insertQuery = `
      INSERT INTO pt_schedules (회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모, 상태)
      VALUES (?, ?, ?, ?, ?, ?, ?, '예약중')
    `;
    const values = [회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 메모];

    db.query(insertQuery, values, (err, result) => {
      if (err) return res.status(500).json({ error: '등록 실패' });

      db.query('UPDATE members SET 잔여횟수 = 잔여횟수 - 1 WHERE id = ?', [회원id]);
      res.json({ message: 'PT 수업 등록 완료 + 잔여횟수 차감', schedule_id: result.insertId });
    });
  });
};

// 전체 수업 조회
exports.getAll = (req, res) => {
  db.query('SELECT * FROM pt_schedules ORDER BY 수업일 DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: '조회 실패' });
    res.json(rows);
  });
};

// 완료 수업 조회
exports.getCompleted = (req, res) => {
  db.query("SELECT * FROM pt_schedules WHERE 상태 = '완료' ORDER BY 수업일 DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: '조회 실패' });
    res.json(rows);
  });
};

// 상태 변경 (예약 → 완료)
exports.markAsCompleted = (req, res) => {
  const id = req.params.id;
  db.query("UPDATE pt_schedules SET 상태 = '완료' WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: '상태 변경 실패' });
    res.json({ message: '수업이 완료 처리되었습니다.' });
  });
};

// 수업 삭제 + 잔여횟수 복구
exports.deleteSchedule = (req, res) => {
  const id = req.params.id;

  db.query('SELECT 회원id, 상태 FROM pt_schedules WHERE id = ?', [id], (err, rows) => {
    if (err || rows.length === 0) return res.status(400).json({ error: '해당 스케줄을 찾을 수 없습니다.' });

    const { 회원id, 상태 } = rows[0];
    db.query('DELETE FROM pt_schedules WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: '삭제 실패' });

      if (상태 === '예약중') {
        db.query('UPDATE members SET 잔여횟수 = 잔여횟수 + 1 WHERE id = ?', [회원id]);
      }
      res.json({ message: 'PT 스케줄이 삭제되었습니다.' });
    });
  });
};

// 달력용 스케줄 조회
exports.getCalendar = (req, res) => {
  db.query(`
    SELECT id, CONCAT('[', 상태, '] ', 강사) AS title,
           CONCAT(수업일, 'T', 시작시간) AS start,
           CONCAT(수업일, 'T', 종료시간) AS end,
           상태, 수업종류
    FROM pt_schedules
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: '달력 조회 실패' });
    res.json(rows);
  });
};

// 회원별 완료 수업 통계
exports.getStats = (req, res) => {
  const id = req.params.id;
  db.query('SELECT COUNT(*) AS total_sessions FROM pt_schedules WHERE 회원id = ? AND 상태 = "완료"', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: '통계 조회 실패' });
    res.json({ member_id: id, total_sessions: rows[0].total_sessions });
  });
};

// 회원별 완료 수업 날짜
exports.getCompletedDates = (req, res) => {
  const id = req.params.id;
  db.query('SELECT DATE(수업일) AS date FROM pt_schedules WHERE 회원id = ? AND 상태 = "완료"', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: '수업 날짜 조회 실패' });
    const dates = rows.map(row => row.date);
    res.json({ member_id: id, session_dates: dates });
  });
};
