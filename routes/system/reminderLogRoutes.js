// Version: 4.5_04_04_004

const express = require('express');
const router = express.Router();
const logController = require('../controllers/system/reminderLogController');

/**
 * @swagger
 * /api/reminders/logs:
 *   get:
 *     summary: 알림 발송 로그 조회
 *     tags: [ReminderLogs]
 *     responses:
 *       200:
 *         description: 최근 발송 이력 반환
 */
router.get('/logs', logController.getLogs);

module.exports = router;
