// Version: 4.5_04_03_009
/**
 * @swagger
 * /api/exercise-goals:
 *   post:
 *     summary: 운동 목표 등록
 *     tags: [ExerciseGoals]
 *
 * /api/exercise-goals/member/{id}:
 *   get:
 *     summary: 회원별 운동 목표 조회
 *     tags: [ExerciseGoals]
 */


const express = require('express');
const router = express.Router();
const controller = require('../controllers/records/exerciseGoalController');

router.post('/goal', controller.setGoal);
router.get('/goal/:회원id/:운동명', controller.compareWithRecords);

module.exports = router;
