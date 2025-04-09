// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 사용자 목록 조회
 *     tags: [Users]
 *   post:
 *     summary: 사용자 등록
 *     tags: [Users]

 * /api/users/{id}/status:
 *   patch:
 *     summary: 사용자 상태 변경
 *     tags: [Users]
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/system/userController');

// ✅ 전체 사용자 목록 조회
router.get('/', userController.getAllUsers);

// ✅ 사용자 등록
router.post('/', userController.createUser);

// ✅ 사용자 상태 변경 (활성/비활성)
router.patch('/:id/status', userController.updateUserStatus);

module.exports = router;
