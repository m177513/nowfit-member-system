// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: 미디어 등록
 *     tags: [Media]
 *   get:
 *     summary: 전체 미디어 조회
 *     tags: [Media]
 *
 * /api/media/member/{id}:
 *   get:
 *     summary: 회원별 미디어 조회
 *     tags: [Media]
 */

const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/records/mediaController');

// ✅ 미디어 등록
router.post('/', mediaController.addMedia);

// ✅ 회원별 미디어 조회
router.get('/member/:id', mediaController.getMediaByMember);

// ✅ 전체 미디어 목록 (필터 가능: /?유형=사진 또는 /?유형=영상)
router.get('/', mediaController.getAllMedia);

module.exports = router;
