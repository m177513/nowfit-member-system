// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/bodymetrics:
 *   post:
 *     summary: 신체 측정 등록
 *     tags: [BodyMetrics]
 *
 * /api/bodymetrics/member/{id}:
 *   get:
 *     summary: 회원별 신체 측정 기록
 *     tags: [BodyMetrics]
 *
 * /api/bodymetrics/member/{id}/latest:
 *   get:
 *     summary: 회원별 최근 측정 1건
 *     tags: [BodyMetrics]
 */

const express = require('express');
const router = express.Router();
const bodyMetricsController = require('../controllers/records/bodyMetricsController');

// ✅ 신체 측정 등록
router.post('/', bodyMetricsController.addMetrics);

// ✅ 회원별 전체 측정 기록 조회
router.get('/member/:id', bodyMetricsController.getMetricsByMember);

// ✅ 회원별 최근 측정 1건 조회
router.get('/member/:id/latest', bodyMetricsController.getLatestMetrics);

module.exports = router;
