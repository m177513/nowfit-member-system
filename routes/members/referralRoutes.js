// Version: 4.5_04_03_015
/**
 * @swagger
 * /api/referrals/register:
 *   post:
 *     summary: 회원 추천 등록
 *     tags: [Referral]
 */

const express = require('express');
const router = express.Router();
const referralController = require('../controllers/system/referralController');

// 소개 등록
router.post('/register', referralController.registerReferral);

module.exports = router;
