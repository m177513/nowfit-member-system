// Version: 4.5_04_04_005
const express = require('express');
const router = express.Router();
const notificationAIController = require('../controllers/system/notificationAIController');

/**
 * @swagger
 * /api/ai/notifications/member/{id}:
 *   get:
 *     summary: 회원 AI 알림 추천 조회
 *     tags: [AI Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 회원 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 추천 알림 목록
 */
router.get('/ai/notifications/member/:id', notificationAIController.getNotificationSuggestions);

module.exports = router;
