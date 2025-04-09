// Version: 4.5_04_03_001

const db = require('../../config/db');

// 회원의 운동 기록 평균치 변화 그래프용 데이터 (운동명 기준)
exports.getExerciseProgress = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT 
      운동명,
      DATE(수업일) AS 날짜,
      AVG(무게) AS 평균무게,
      AVG(횟수) AS 평균횟수
    FROM exercise_records
    WHERE 회원id = ?
    GROUP BY 운동명, DATE(수업일)
    ORDER BY 운동명, 날짜;
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('운동 진척도 통계 오류:', err);
      return res.status(500).json({ error: '운동 진척도 통계 조회 실패' });
    }

    const formatted = results.reduce((acc, row) => {
      const { 운동명, 날짜, 평균무게, 평균횟수 } = row;
      if (!acc[운동명]) acc[운동명] = [];
      acc[운동명].push({ 날짜, 평균무게, 평균횟수 });
      return acc;
    }, {});

    res.json({ member_id: memberId, progress: formatted });
  });
};

// 회원별 수업 수 통계
exports.getSessionStats = (req, res) => {
  const memberId = req.params.id;

  const query = `
    SELECT 
      상태,
      COUNT(*) AS count
    FROM ptschedules
    WHERE 회원id = ?
    GROUP BY 상태;
  `;

  db.query(query, [memberId], (err, results) => {
    if (err) {
      console.error('PT 수업 통계 오류:', err);
      return res.status(500).json({ error: '수업 통계 조회 실패' });
    }

    const stats = {
      예약중: 0,
      완료: 0,
      취소: 0,
    };

    results.forEach(row => {
      if (stats[row.상태] !== undefined) stats[row.상태] = row.count;
    });

    res.json({ member_id: memberId, session_stats: stats });
  });
};
