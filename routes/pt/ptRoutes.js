// Version: 4.5_04_02_006
/**
 * @swagger
 * /api/pt:
 *   post:
 *     summary: PT 수업 등록 및 잔여횟수 차감
 *     tags: [PT]
 *   get:
 *     summary: 전체 PT 수업 조회
 *     tags: [PT]

 * /api/pt/completed:
 *   get:
 *     summary: 완료된 PT 수업 조회
 *     tags: [PT]

 * /api/pt/{id}/complete:
 *   patch:
 *     summary: 수업 완료 처리
 *     tags: [PT]

 * /api/pt/{id}:
 *   delete:
 *     summary: 수업 삭제 및 잔여횟수 복구
 *     tags: [PT]

 * /api/pt/calendar:
 *   get:
 *     summary: 달력용 스케줄 조회
 *     tags: [PT]

 * /api/pt/{id}/stats:
 *   get:
 *     summary: 수업 통계 조회
 *     tags: [PT]

 * /api/pt/{id}/dates:
 *   get:
 *     summary: 수업 완료 날짜 목록
 *     tags: [PT]
 */

const express = require('express');
const router = express.Router();
const ptController = require('../controllers/pt/ptController');

// PT 수업 등록 + 잔여횟수 차감
router.post('/', ptController.createSchedule);

// 전체 수업 조회
router.get('/', ptController.getAll);

// 완료 수업만 조회
router.get('/completed', ptController.getCompleted);

// 수업 상태 완료 처리
router.patch('/:id/complete', ptController.markAsCompleted);

// 수업 삭제 + 잔여횟수 복구
router.delete('/:id', ptController.deleteSchedule);

// 달력용 스케줄 조회
router.get('/calendar', ptController.getCalendar);

// 수업 통계
router.get('/:id/stats', ptController.getStats);

// 수업 완료 날짜
router.get('/:id/dates', ptController.getCompletedDates);

module.exports = router;
