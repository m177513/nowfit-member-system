// Version: 4.5_04_02_013
/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: 회원 검색
 *     tags: [Search]
 */

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/system/searchController');

// 검색 키워드로 회원 조회
router.get('/', searchController.searchMembers);

module.exports = router;
