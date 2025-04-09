// Version: 4.5_04_05_004

const express = require('express');
const router = express.Router();
const statsController = require('../controllers/system/reminderStatsController');

/**
 * @swagger
 * /api/reminders/stats:
 *   get:
 *     summary: 최근 30일 알림 통계 요약
 *     tags: [ReminderStats]
 *     responses:
 *       200:
 *         description: 최근 발송 수, 성공/실패 수 등 통계 반환
 */
router.get('/stats', statsController.getReminderStats);

module.exports = router;
