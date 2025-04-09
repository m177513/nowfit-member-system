// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/ptpasses:
 *   post:
 *     summary: PT권 등록
 *     tags: [PTPass]
 *   get:
 *     summary: 전체 PT권 조회 (필터 가능)
 *     tags: [PTPass]

 * /api/ptpasses/member/{id}:
 *   get:
 *     summary: 회원별 PT권 조회
 *     tags: [PTPass]
 */

const express = require('express');
const router = express.Router();
const ptPassController = require('../controllers/pt/ptPassController');

// ✅ PT권 등록
router.post('/', ptPassController.addPass);

// ✅ 회원별 PT권 조회
router.get('/member/:id', ptPassController.getPassesByMember);

// ✅ 전체 PT권 조회 (필터: /?trainer=홍길동&status=사용중)
router.get('/', ptPassController.getAllPasses);

module.exports = router;
