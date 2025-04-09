// Version: 4.5_04_05_001

const express = require('express');
const router = express.Router();
const scheduler = require('../../schedulers/reminderScheduler');

/**
 * @swagger
 * /api/reminders/manual-send:
 *   post:
 *     summary: 수동으로 알림 발송
 *     tags: [Reminders]
 *     responses:
 *       200:
 *         description: 알림이 발송되었습니다
 */
router.post('/manual-send', async (req, res) => {
  try {
    const result = await scheduler.sendRemindersManually();
    res.status(200).json({ message: '수동 발송 완료', result });
  } catch (error) {
    console.error('수동 발송 실패:', error);
    res.status(500).json({ message: '수동 발송 중 오류 발생', error });
  }
});

module.exports = router;
