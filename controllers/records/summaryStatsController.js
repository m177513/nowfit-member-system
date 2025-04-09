// Version: 4.5_04_04_007 (통합본)
const db = require('../../config/db');

// ✅ GET: 종합 통계 조회
exports.getSummaryStats = async (req, res) => {
  const memberId = req.params.id;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const [attendance] = await queryPromise(`
      SELECT COUNT(*) AS 총기록,
        SUM(CASE WHEN 상태 = '출석' THEN 1 ELSE 0 END) AS 출석횟수,
        SUM(CASE WHEN 상태 = '결석' THEN 1 ELSE 0 END) AS 결석횟수,
        ROUND(IFNULL(SUM(CASE WHEN 상태 = '출석' THEN 1 ELSE 0 END) / COUNT(*) * 100, 0), 1) AS 출석률
      FROM attendance
      WHERE member_id = ?
    `, [memberId]);

    const exercise = await queryPromise(`
      SELECT 운동명 AS exercise, SUM(횟수) AS totalReps
      FROM exercise WHERE member_id = ?
      GROUP BY 운동명 ORDER BY totalReps DESC LIMIT 10
    `, [memberId]);

    const [diet] = await queryPromise(`
      SELECT COUNT(*) AS 총식단수, SUM(칼로리) AS 총칼로리,
        SUM(탄수화물) AS 탄수화물, SUM(단백질) AS 단백질, SUM(지방) AS 지방,
        ROUND(SUM(단백질)/(SUM(탄수화물)+SUM(단백질)+SUM(지방))*100, 1) AS 단백질비율,
        ROUND(SUM(탄수화물)/(SUM(탄수화물)+SUM(단백질)+SUM(지방))*100, 1) AS 탄수화물비율,
        ROUND(SUM(지방)/(SUM(탄수화물)+SUM(단백질)+SUM(지방))*100, 1) AS 지방비율
      FROM diet WHERE member_id = ?
    `, [memberId]);

    const goals = await queryPromise(`
      SELECT g.운동명 AS 운동명, g.목표횟수 AS 목표,
        IFNULL(SUM(e.횟수), 0) AS 실제수행,
        ROUND(IFNULL(SUM(e.횟수)/g.목표횟수*100, 0), 1) AS 달성률
      FROM exercise_goals g
      LEFT JOIN exercise e ON g.운동명 = e.운동명 AND g.member_id = e.member_id
      WHERE g.member_id = ?
      GROUP BY g.운동명, g.목표횟수
    `, [memberId]);

    const ai = [];
    const [pt] = await queryPromise(`SELECT COUNT(*) AS count FROM ptschedules WHERE member_id = ? AND 날짜 = ?`, [memberId, today]);
    if (pt.count > 0) ai.push('오늘 PT 수업이 있어요!');

    const [recentAttendance] = await queryPromise(`SELECT COUNT(*) AS count FROM attendance WHERE member_id = ? AND 상태 = '출석' AND 날짜 >= DATE_SUB(?, INTERVAL 3 DAY)`, [memberId, today]);
    if (recentAttendance.count === 0) ai.push('3일 연속 출석하지 않았습니다. 괜찮으신가요?');

    const [weekAttendance] = await queryPromise(`SELECT COUNT(DISTINCT 날짜) AS days FROM attendance WHERE member_id = ? AND 상태 = '출석' AND 날짜 >= DATE_SUB(?, INTERVAL 7 DAY)`, [memberId, today]);
    if (weekAttendance.days >= 7) ai.push('일주일 연속 출석! 멋져요 👏');

    res.json({ attendance, exercise, diet, goals, ai });

  } catch (err) {
    console.error('📛 종합 통계 오류:', err);
    res.status(500).json({ error: '종합 통계 조회 실패' });
  }
};

// ✅ POST: 수동 통계 갱신 (현재는 예시용)
exports.updateSummaryStats = (req, res) => {
  const { member_id } = req.body;
  // 이 부분은 실제 갱신 로직이 추가될 수 있음
  res.status(200).json({
    message: `회원 ${member_id}의 통계가 수동으로 갱신되었습니다. (예시)`
  });
};

// 공통 queryPromise
function queryPromise(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
