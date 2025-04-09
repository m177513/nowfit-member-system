// Version: 4.5_04_03_005

const db = require('../../config/db');

// PT 시작시간이 지난 '예약중' 수업 중 출석 없는 건 취소
exports.autoCancelUnattended = (req, res) => {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME 포맷

  const query = `
    UPDATE ptschedules
    SET 상태 = '취소'
    WHERE 상태 = '예약중'
      AND CONCAT(수업일, ' ', 시작시간) < ?
      AND id NOT IN (
        SELECT DISTINCT pt_schedule_id FROM pt_attendance
      )
  `;

  db.query(query, [now], (err, result) => {
    if (err) {
      console.error('자동 취소 오류:', err);
      return res.status(500).json({ error: '자동 취소에 실패했습니다.' });
    }
    res.json({ message: '미출석 수업 자동 취소 완료', affectedRows: result.affectedRows });
  });
};
