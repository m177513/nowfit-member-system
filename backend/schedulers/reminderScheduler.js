// Version: 4.5_04_05_002

const cron = require('node-cron');
const db = require('../config/db');
const dayjs = require('dayjs');
const { saveLog } = require('../controllers/system/reminderLogController');

const sendReminderToEligibleMembers = async () => {
  try {
    const [settingsRows] = await db.query(`SELECT * FROM reminder_settings LIMIT 1`);
    if (settingsRows.length === 0 || !settingsRows[0].enabled) return;

    const { message, schedule } = settingsRows[0];
    const schedules = JSON.parse(schedule);
    const now = dayjs();

    for (const s of schedules) {
      const { monthsAfter, dayOfWeek, time } = s;

      const dayMatch = now.format('dddd') === dayOfWeek;
      const timeMatch = now.format('HH:mm') === time;

      if (dayMatch && timeMatch) {
        const [members] = await db.query(`
          SELECT id, name, phone, expired_at
          FROM members
          WHERE expired_at IS NOT NULL
            AND DATEDIFF(CURDATE(), expired_at) BETWEEN ${30 * monthsAfter} AND ${30 * monthsAfter + 1}
        `);

        const [events] = await db.query(`SELECT * FROM monthly_events WHERE month = ?`, [now.month() + 1]);

        let eventText = '';
        if (events.length > 0) {
          const e = events[0];
          const allEvents = [e.내용1, e.내용2, e.내용3, e.내용4, e.내용5].filter(Boolean);
          eventText = allEvents.map((e, i) => `${i + 1}. ${e}`).join('\n');
        }

        for (const m of members) {
          const finalMessage = `운동 끝나신지 ${monthsAfter}개월 되셨습니다. 다시 시작하셔야죠?\n\n${message}\n\n${eventText}`;
          console.log(`[알림] ${m.name}님께 메시지 전송:\n${finalMessage}`);
          saveLog(m.id, monthsAfter, finalMessage); // 로그 저장
        }
      }
    }
  } catch (err) {
    console.error('[CRON] 알림 발송 중 오류:', err);
  }
};

// 매일 09:00, 12:00, 18:00 실행
cron.schedule('0 9,12,18 * * *', sendReminderToEligibleMembers);

module.exports = sendReminderToEligibleMembers;
