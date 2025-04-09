// Version: 4.5_04_03_011
/**
 * @swagger
 * /api/ptdetail/{id}:
 *   get:
 *     summary: PT 상세 정보 조회
 *     tags: [PT]
 */

const express = require('express');
const router = express.Router();
const ptDetailController = require('../controllers/pt/ptDetailController');

// PT 상세 정보 조회
router.get('/:id', ptDetailController.getPTDetail);

module.exports = router;
