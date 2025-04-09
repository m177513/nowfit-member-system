// Version: 4.5_04_03_002
/**
 * @swagger
 * /api/member-stats/status:
 *   get:
 *     summary: 회원 상태 통계 조회
 *     tags: [Members]
 */

const express = require('express');
const router = express.Router();
const memberStatsController = require('../controllers/members/memberStatsController');

// 회원 상태 통계 API
router.get('/status', memberStatsController.getMemberStatusStats);

module.exports = router;
