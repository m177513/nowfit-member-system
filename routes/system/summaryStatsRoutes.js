// Version: 4.5_04_04_007
const express = require('express');
const router = express.Router();
const summaryStatsController = require('../controllers/records/summaryStatsController');

/**
 * @swagger
 * /api/summary-stats/member/{id}:
 *   get:
 *     summary: 회원 종합 통계 조회
 *     tags: [SummaryStats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 통합 통계 정보
 */
router.get('/summary-stats/member/:id', summaryStatsController.getSummaryStats);

/**
 * @swagger
 * /api/summary-stats:
 *   post:
 *     summary: 종합 통계 수동 갱신
 *     tags: [SummaryStats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 수동 갱신 완료 메시지
 */
router.post('/summary-stats', summaryStatsController.updateSummaryStats);

module.exports = router;
