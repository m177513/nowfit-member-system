// Version: 4.5_04_03_002
/**
 * @swagger
 * /api/ptstats/{id}/sessions:
 *   get:
 *     summary: 회원별 수업 상태 통계
 *     tags: [PTStats]

 * /api/ptstats/{id}/progress:
 *   get:
 *     summary: 운동 진척도 그래프 데이터
 *     tags: [PTStats]
 */

const express = require('express');
const router = express.Router();
const ptStatsController = require('../controllers/pt/ptStatsController');

// 회원별 수업 상태 통계
router.get('/:id/sessions', ptStatsController.getSessionStats);

// 운동 진척도 변화 그래프용 데이터
router.get('/:id/progress', ptStatsController.getExerciseProgress);

module.exports = router;
