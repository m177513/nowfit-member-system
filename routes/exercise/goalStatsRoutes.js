// Version: 4.5_04_04_004
const express = require('express');
const router = express.Router();
const goalStatsController = require('../controllers/records/goalStatsController');

/**
 * @swagger
 * /api/statistics/goals/member/{id}:
 *   get:
 *     summary: 회원 운동 목표 달성률 통계
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 회원 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 운동 목표 통계 정보
 */
router.get('/statistics/goals/member/:id', goalStatsController.getGoalStats);

module.exports = router;
