// Version: 4.5_04_03_003

const db = require('../config/db');

class ExerciseProgress {
  static getProgressByMemberAndExercise(memberId, exerciseName, callback) {
    const query = `
      SELECT 수업일, 무게, 횟수 
      FROM exercise_records 
      WHERE 회원id = ? AND 운동명 = ? 
      ORDER BY 수업일 ASC
    `;
    db.query(query, [memberId, exerciseName], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }
}

module.exports = ExerciseProgress;
