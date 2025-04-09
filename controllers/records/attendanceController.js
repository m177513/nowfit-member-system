// Version: 4.5_04_03_merged
const db = require('../../config/db');

// 출석 등록
exports.checkIn = (req, res) => {
  const { member_id, 출석유형, 트레이너, 메모 } = req.body;

  if (!member_id) {
    return res.status(400).json({ error: '회원 ID가 필요합니다.' });
  }

  const query = `
    INSERT INTO attendance (member_id, 출석일시, 출석유형, 트레이너, 메모)
    VALUES (?, NOW(), ?, ?, ?)
  `;

  db.query(query, [member_id, 출석유형 || '일반운동', 트레이너 || '', 메모 || ''], (err, result) => {
    if (err) {
      console.error('출석 등록 오류:', err);
      return res.status(500).json({ error: '출석 기록에 실패했습니다.' });
    }
    res.json({ message: '출석이 기록되었습니다.', id: result.insertId });
  });
};

// 전체 출석 내역 조회
exports.getAll = (req, res) => {
  const query = `
    SELECT a.id, a.member_id, m.회원명, a.출석일시, a.출석유형, a.트레이너, a.메모
    FROM attendance a
    JOIN members m ON a.member_id = m.id
    ORDER BY a.출석일시 DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('출석 조회 오류:', err);
      return res.status(500).json({ error: '출석 조회 실패' });
    }
    res.json(results);
  });
};

// 특정 회원의 전체 출석 수
exports.getTotalByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT COUNT(*) AS total_attendance
    FROM attendance
    WHERE member_id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('출석 통계 오류:', err);
      return res.status(500).json({ error: '통계 조회 실패' });
    }
    res.json({ member_id: id, total_attendance: results[0].total_attendance || 0 });
  });
};

// 특정 회원의 출석 일자 리스트
exports.getDatesByMember = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT DATE(출석일시) AS date
    FROM attendance
    WHERE member_id = ?
    ORDER BY 출석일시 DESC
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('출석 날짜 조회 오류:', err);
      return res.status(500).json({ error: '날짜 조회 실패' });
    }
    res.json({ member_id: id, dates: results.map(r => r.date) });
  });
};

// 일자별 출석 수 통계
exports.getDailyStats = (req, res) => {
  const query = `
    SELECT DATE(출석일시) AS date, COUNT(*) AS count
    FROM attendance
    GROUP BY DATE(출석일시)
    ORDER BY date DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('일별 통계 오류:', err);
      return res.status(500).json({ error: '일별 통계 실패' });
    }
    res.json(results);
  });
};

// 달력용 출석 목록
exports.getCalendar = (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT DATE(출석일시) AS date
    FROM attendance
    WHERE member_id = ?
    ORDER BY 출석일시
  `;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('달력 조회 오류:', err);
      return res.status(500).json({ error: '달력 데이터 실패' });
    }
    res.json({ member_id: id, calendar_dates: results.map(r => r.date) });
  });
};
