// Version: 4.5_04_03_004
/**
 * @swagger
 * /api/membership-alerts:
 *   post:
 *     summary: 회원권 알림 전송
 *     tags: [System]
 */

const express = require('express');
const router = express.Router();
const membershipAlertController = require('../controllers/members/membershipAlertController');

// 만료 임박 회원권 알림용 API
router.get('/expiring', membershipAlertController.getExpiringMemberships);

module.exports = router;
