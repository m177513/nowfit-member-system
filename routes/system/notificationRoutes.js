// Version: 4.5_04_03_013
/**
 * @swagger
 * /api/notifications/expiring:
 *   get:
 *     summary: 만료 임박 회원 조회
 *     tags: [Notifications]
 */

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/system/notificationController');

// 만료 임박 회원 조회 (회원권/라커)
router.get('/expiring', notificationController.getExpiringMembers);

module.exports = router;
