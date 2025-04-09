// Version: 4.5_04_03_merged
const db = require('../../config/db');

// 운동 기록 등록
exports.addExercise = (req, res) => {
  const { pt_schedule_id, 운동명, 무게, 횟수, 세트수, 메모, 트레이너 } = req.body;

  if (!pt_schedule_id || !운동명 || !무게 || !횟수 || !세트수) {
    return res.status(400).json({ error: '운동명, 무게, 횟수, 세트수는 필수입니다.' });
  }

  const query = `
    INSERT INTO exercises (pt_schedule_id, 운동명, 무게, 횟수, 세트수, 메모, 트레이너)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [pt_schedule_id, 운동명, 무게, 횟수, 세트수, 메모 || '', 트레이너 || ''];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('운동 등록 오류:', err);
      return res.status(500).json({ error: '운동 등록 실패' });
    }
    res.json({ message: '운동 등록 완료', exercise_id: result.insertId });
  });
};

// 특정 PT 스케줄의 운동 기록 조회
exports.getExercisesBySchedule = (req, res) => {
  const scheduleId = req.params.id;

  const query = `
    SELECT id, 운동명, 무게, 횟수, 세트수, 메모, 트레이너
    FROM exercises
    WHERE pt_schedule_id = ?
    ORDER BY id ASC
  `;

  db.query(query, [scheduleId], (err, results) => {
    if (err) {
      console.error('운동 조회 오류:', err);
      return res.status(500).json({ error: '운동 조회 실패' });
    }
    res.json(results);
  });
};
