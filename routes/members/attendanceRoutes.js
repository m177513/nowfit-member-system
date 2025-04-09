// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: 출석 등록
 *     tags: [Attendance]
 *
 * /api/attendance/member/{id}:
 *   get:
 *     summary: 회원별 출석 조회
 *     tags: [Attendance]
 */


const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/records/attendanceController');

// 출석 등록
router.post('/', attendanceController.checkIn);

// 전체 출석 내역 조회
router.get('/', attendanceController.getAll);

// 특정 회원 출석 총 횟수
router.get('/total/:id', attendanceController.getTotalByMember);

// 특정 회원의 출석 일자 리스트
router.get('/dates/:id', attendanceController.getDatesByMember);

// 출석 통계 (일자별 출석 수)
router.get('/stats/daily', attendanceController.getDailyStats);

// 달력용 출석 리스트
router.get('/calendar/:id', attendanceController.getCalendar);

module.exports = router;
