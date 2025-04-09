// Version: 4.5_04_02_011
/**
 * @swagger
 * /api/status/{id}:
 *   patch:
 *     summary: 회원 상태 수정
 *     tags: [Members]
 */

const express = require('express');
const router = express.Router();
const statusController = require('../controllers/members/statusController');

// 회원 상태 변경
router.patch('/:id', statusController.updateStatus);

module.exports = router;
