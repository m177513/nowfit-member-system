// Version: 4.5_04_04_003
const db = require('../../config/db');

// ✅ 회원 식단 통계 조회
exports.getDietStats = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT
      COUNT(*) AS 총식단수,
      SUM(칼로리) AS 총칼로리,
      SUM(탄수화물) AS 탄수화물,
      SUM(단백질) AS 단백질,
      SUM(지방) AS 지방,
      ROUND(SUM(단백질) / (SUM(탄수화물) + SUM(단백질) + SUM(지방)) * 100, 1) AS 단백질비율,
      ROUND(SUM(탄수화물) / (SUM(탄수화물) + SUM(단백질) + SUM(지방)) * 100, 1) AS 탄수화물비율,
      ROUND(SUM(지방) / (SUM(탄수화물) + SUM(단백질) + SUM(지방)) * 100, 1) AS 지방비율
    FROM diet
    WHERE member_id = ?
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('📛 식단 통계 오류:', err);
      return res.status
