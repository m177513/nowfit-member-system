// Version: 4.5_04_02_009
/**
 * @swagger
 * /api/points/{id}:
 *   patch:
 *     summary: 회원 포인트 수정
 *     tags: [Points]
 */

const express = require('express');
const router = express.Router();
const pointController = require('../controllers/members/pointController');

// 포인트 수정 (증가 또는 차감)
router.patch('/:id', pointController.updatePoints);

module.exports = router;
