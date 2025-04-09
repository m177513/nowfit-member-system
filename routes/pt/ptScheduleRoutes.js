// Version: 4.5_04_03_merged
/**
 * @swagger
 * /api/ptschedules:
 *   post:
 *     summary: PT 수업 등록
 *     tags: [PTSchedules]
 *   get:
 *     summary: 전체 수업 조회 (트레이너 필터 포함)
 *     tags: [PTSchedules]

 * /api/ptschedules/{id}:
 *   delete:
 *     summary: 수업 삭제 및 잔여횟수 복구
 *     tags: [PTSchedules]
 */

const express = require('express');
const router = express.Router();
const ptController = require('../controllers/pt/ptScheduleController');

// ✅ PT 수업 등록
router.post('/', ptController.createSchedule);

// ✅ 전체 수업 조회 (트레이너 필터 포함)
router.get('/', ptController.getAllSchedules);

// ✅ 수업 삭제 (잔여횟수 복원 포함)
router.delete('/:id', ptController.deleteSchedule);

// 🔜 추후 구현 예정 (보류 중)
// router.get('/member/:memberId', ptController.getSchedulesByMember);
// router.put('/:id', ptController.updateSchedule);
// router.get('/completed', ptController.getCompletedSessions);
// router.get('/calendar', ptController.getCalendarSessions);

module.exports = router;
