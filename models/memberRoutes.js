// Version: 4.5_04_02_010

const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// 전체 회원 조회
router.get('/', memberController.getAllMembers);

// 회원 등록
router.post('/', memberController.createMember);

// 회원 수정
router.put('/:id', memberController.updateMember);

// 회원 삭제
router.delete('/:id', memberController.deleteMember);

module.exports = router;
