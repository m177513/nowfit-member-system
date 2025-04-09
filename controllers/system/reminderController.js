// Version: 4.5_04_04_001
// /controllers/system/reminderController.js

const db = require('../../config/db');
const dayjs = require('dayjs');

// 알림 메시지 생성 함수
function createMessage(months, eventText) {
  return `운동 끝나신지 ${months}개월 되셨습니다. 다시 시작하셔야죠?\n\n` +
         `🎉 나우핏 휘트니스 ${dayjs().format('M')}월 이벤트 안내\n` +
         eventText;
}

// 회원권 만료 후 특정 개월 지난 유저 조회 & 메시지 구성
exports.checkExpiredMemberships = async (req, res) => {
  const { months } = req.params; // 1, 2, 3, 6
  const validMonths = ['1', '2', '3', '6'];
  if (!validMonths.includes(months)) {
    return res.status(400).json({ error: '잘못된 요청입니다. (1/2/3/6만 가능)' });
  }

  const targetDate = dayjs().subtract(Number(months), 'month').format('YYYY-MM-DD');

  const sql = `
    SELECT id, name, phone, membership_end
    FROM members
    WHERE DATE(membership_end) = ?
  `;

  db.query(sql, [targetDate], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB 오류', detail: err });

    const eventText =
      '1. PT 등록 시 1회 추가\n' +
      '2. 친구 추천 시 1만원 할인\n' +
      '3. 첫 등록 회원 무료 체형 측정!';

    const messages = results.map(member => ({
      member,
      message: createMessage(months, eventText)
    }));

    res.json({ count: messages.length, messages });
  });
};
