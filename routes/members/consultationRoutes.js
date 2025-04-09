// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/consultations:
 *   post:
 *     summary: 상담 등록
 *     tags: [Consultation]
 *
 * /api/consultations/member/{id}:
 *   get:
 *     summary: 회원별 상담 조회
 *     tags: [Consultation]
 */

const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/records/consultationController');

// ✅ 상담 등록
router.post('/', consultationController.addConsultation);

// ✅ 회원별 상담 조회
router.get('/member/:id', consultationController.getConsultationsByMember);

// ✅ 전체 상담 목록 (상담유형 필터 가능)
router.get('/', consultationController.getAllConsultations);

module.exports = router;
