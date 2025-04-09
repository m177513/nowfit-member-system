// Version: 4.5_04_03_006
/**
 * @swagger
 * /api/pt-autocancel/autocancel:
 *   patch:
 *     summary: 출석 없는 PT 자동 취소
 *     tags: [PT]
 */

const express = require('express');
const router = express.Router();
const ptAutoCancelController = require('../controllers/pt/ptAutoCancelController');

// 예약 후 출석 없는 PT 수업 자동 취소
router.patch('/autocancel', ptAutoCancelController.autoCancelUnattended);

module.exports = router;
