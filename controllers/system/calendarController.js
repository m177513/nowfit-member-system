// Version: 4.5_04_03_001

const db = require('../../config/db');

// PT 수업 달력 전체 조회
exports.getAllCalendar = (req, res) => {
  const query = `
    SELECT 
      id, 회원id, 강사, 수업종류, 수업일, 시작시간, 종료시간, 상태
    FROM ptschedules
    ORDER BY 수업일 DESC, 시작시간 DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('달력 조회 오류:', err);
      return res.status(500).json({ error: '달력 조회 실패' });
    }

    const calendarEvents = results.map(row => ({
      id: row.id,
      title: `[${row.상태}] ${row.강사}`,
      start: `${row.수업일}T${row.시작시간}`,
      end: `${row.수업일}T${row.종료시간}`,
      상태: row.상태,
      수업종류: row.수업종류
    }));

    res.json(calendarEvents);
  });
};
