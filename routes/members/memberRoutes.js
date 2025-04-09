// Version: 4.5_04_03_merged
/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: 전체 회원 조회
 *     tags: [Members]
 *   post:
 *     summary: 회원 등록
 *     tags: [Members]
 *
 * /api/members/{id}/status:
 *   patch:
 *     summary: 회원 상태 변경
 *     tags: [Members]
 *
 * /api/members/{id}/points:
 *   patch:
 *     summary: 회원 포인트 변경
 *     tags: [Members]
 *
 * /api/members/search:
 *   get:
 *     summary: 회원 검색
 *     tags: [Members]
 */

const express = require('express');
const router = express.Router();
const memberController = require('../controllers/members/memberController');

// 전체 회원 조회
router.get('/', memberController.getAllMembers);

// 회원 상세 조회
router.get('/:id', memberController.getMemberById);

// 회원 검색 (예: /api/members/search?keyword=홍길동)
router.get('/search/keyword', memberController.searchMembers);

// 회원 등록
router.post('/', memberController.createMember);

// 회원 수정
router.put('/:id', memberController.updateMember);

// 회원 삭제
router.delete('/:id', memberController.deleteMember);

// 회원 상태 변경 (활동, 휴면, 탈퇴)
router.patch('/:id/status', memberController.updateStatus);

// 포인트 수정 (amount: +10 또는 -10)
router.patch('/:id/points', memberController.updatePoints);

module.exports = router;
