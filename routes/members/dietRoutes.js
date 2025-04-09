// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/diet:
 *   post:
 *     summary: 식단 등록
 *     tags: [Diet]
 *   get:
 *     summary: 전체 식단 조회 (필터 가능)
 *     tags: [Diet]
 *
 * /api/diet/member/{id}:
 *   get:
 *     summary: 회원별 식단 조회
 *     tags: [Diet]
 */

const express = require('express');
const router = express.Router();
const dietController = require('../controllers/records/dietController');

// ✅ 식단 등록
router.post('/', dietController.addDiet);

// ✅ 회원별 식단 조회
router.get('/member/:id', dietController.getDietByMember);

// ✅ 전체 식단 조회 (필터: /?date=2025-04-03&trainer=홍트레이너)
router.get('/', dietController.getAllDiet);

module.exports = router;
