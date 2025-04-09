// Version: 4.5_04_03_014

const db = require('../../config/db');

// 소개회원 등록 및 보너스 적용
exports.registerReferral = (req, res) => {
  const { 추천자ID, 신규회원ID } = req.body;

  if (!추천자ID || !신규회원ID) {
    return res.status(400).json({ error: '추천자ID와 신규회원ID가 필요합니다.' });
  }

  // 소개 등록 및 보너스 일수 적용 (15일)
  const updateQuery = `
    UPDATE members SET 종료일 = DATE_ADD(종료일, INTERVAL 15 DAY)
    WHERE id IN (?, ?)
  `;

  db.query(updateQuery, [추천자ID, 신규회원ID], (err) => {
    if (err) {
      console.error('보너스 적용 오류:', err);
      return res.status(500).json({ error: '보너스 적용 실패' });
    }

    const insertQuery = `
      INSERT INTO referrals (추천자ID, 신규회원ID, 등록일) VALUES (?, ?, NOW())
    `;

    db.query(insertQuery, [추천자ID, 신규회원ID], (err2) => {
      if (err2) {
        console.error('추천 등록 오류:', err2);
        return res.status(500).json({ error: '추천 등록 실패' });
      }

      res.json({ message: '추천 등록 및 보너스 지급 완료' });
    });
  });
};
