// Version: 4.5_04_04_002
const express = require('express');
const router = express.Router();
const exerciseStatsController = require('../controllers/records/exerciseStatsController');

/**
 * @swagger
 * /api/statistics/exercise/member/{id}:
 *   get:
 *     summary: 회원 운동 루틴 분석
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
 *         description: 운동 통계 정보
 */
router.get('/statistics/exercise/member/:id', exerciseStatsController.getExerciseStats);

module.exports = router;
