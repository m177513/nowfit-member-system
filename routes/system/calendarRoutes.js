// Version: 4.5_04_03_001
/**
 * @swagger
 * /api/calendar:
 *   get:
 *     summary: 전체 캘린더 조회
 *     tags: [Calendar]
 */

const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/system/calendarController');

router.get('/', calendarController.getAllCalendar);

module.exports = router;
