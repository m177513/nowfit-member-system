// Version: 4.5_04_05_004

const db = require('../../config/db');

// 최근 30일 알림 발송 통계 요약
exports.getReminderStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        DATE(sent_at) AS 날짜,
        COUNT(*) AS 발송수,
        SUM(CASE WHEN status = '성공' THEN 1 ELSE 0 END) AS 성공,
        SUM(CASE WHEN status != '성공' THEN 1 ELSE 0 END) AS 실패
      FROM reminder_logs
      WHERE sent_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(sent_at)
      ORDER BY 날짜 DESC
    `);

    const [totalRow] = await db.query(`
      SELECT
        COUNT(*) AS 총발송,
        COUNT(DISTINCT member_id) AS 대상회원수,
        SUM(CASE WHEN status = '성공' THEN 1 ELSE 0 END) AS 총성공,
        SUM(CASE WHEN status != '성공' THEN 1 ELSE 0 END) AS 총실패
      FROM reminder_logs
      WHERE sent_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    `);

    res.json({
      최근30일: totalRow[0],
      일자별통계: rows,
    });
  } catch (err) {
    console.error('[통계 조회 오류]', err);
    res.status(500).json({ error: '통계 조회 중 오류 발생' });
  }
};
