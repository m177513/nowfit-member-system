// Version: 4.5_04_04_001
const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/records/statisticsController');

/**
 * @swagger
 * /api/statistics/attendance/member/{id}:
 *   get:
 *     summary: 회원 출석 통계 조회
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
 *         description: 출석 통계 정보
 */
router.get('/attendance/member/:id', statisticsController.getAttendanceStats);

module.exports = router;
