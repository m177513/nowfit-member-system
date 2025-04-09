// Version: 4.5_04_02_007
/**
 * @swagger
 * /api/exercise:
 *   post:
 *     summary: 운동 기록 등록
 *     tags: [Exercise]
 *
 * /api/exercise/{id}:
 *   get:
 *     summary: PT 일정별 운동 기록 조회
 *     tags: [Exercise]
 */

const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/records/exerciseController');

// 운동 기록 등록
router.post('/', exerciseController.addExercise);

// 특정 스케줄의 운동 기록 조회
router.get('/:id', exerciseController.getExercisesBySchedule);

module.exports = router;
