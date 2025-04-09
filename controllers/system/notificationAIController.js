// Version: 4.5_04_04_005
const db = require('../../config/db');

// ✅ AI 알림 추천 (출석, PT 일정 기반)
exports.getNotificationSuggestions = (req, res) => {
  const memberId = req.params.id;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const suggestions = [];

  // 1. 오늘 PT 수업 있는지 확인
  const ptQuery = `
    SELECT COUNT(*) AS count
    FROM ptschedules
    WHERE member_id = ? AND 날짜 = ?
  `;

  // 2. 최근 3일간 출석 여부 확인
  const attendanceQuery = `
    SELECT COUNT(*) AS count
    FROM attendance
    WHERE member_id = ? AND 상태 = '출석' AND 날짜 >= DATE_SUB(?, INTERVAL 3 DAY)
  `;

  // 3. 최근 7일 연속 출석 여부
  const weekQuery = `
    SELECT COUNT(DISTINCT 날짜) AS days
    FROM attendance
    WHERE member_id = ? AND 상태 = '출석' AND 날짜 >= DATE_SUB(?, INTERVAL 7 DAY)
  `;

  db.query(ptQuery, [memberId, today], (err, ptResult) => {
    if (err) return res.status(500).json({ error: 'PT 일정 확인 실패' });

    if (ptResult[0].count > 0) {
      suggestions.push('오늘 PT 수업이 있어요!');
    }

    db.query(attendanceQuery, [memberId, today], (err, attResult) => {
      if (err) return res.status(500).json({ error: '출석 기록 확인 실패' });

      if (attResult[0].count === 0) {
        suggestions.push('3일 연속 출석하지 않았습니다. 괜찮으신가요?');
      }

      db.query(weekQuery, [memberId, today], (err, weekResult) => {
        if (err) return res.status(500).json({ error: '주간 출석 확인 실패' });

        if (weekResult[0].days >= 7) {
          suggestions.push('일주일 연속 출석! 멋져요 👏');
        }

        res.json({
          memberId,
          알림: suggestions
        });
      });
    });
  });
};
