// Version: 4.5_04_04_003
const express = require('express');
const router = express.Router();
const dietStatsController = require('../controllers/records/dietStatsController');

/**
 * @swagger
 * /api/statistics/diet/member/{id}:
 *   get:
 *     summary: 회원 식단 통계 조회
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
 *         description: 식단 통계 정보
 */
router.get('/statistics/diet/member/:id', dietStatsController.getDietStats);

module.exports = router;
