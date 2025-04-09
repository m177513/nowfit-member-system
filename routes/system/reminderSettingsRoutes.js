// Version: 4.5_04_05_004

const express = require('express');
const router = express.Router();
const controller = require('../../controllers/system/reminderSettingsController');

/**
 * @swagger
 * /api/reminder-settings:
 *   get:
 *     summary: 예약 메시지 및 설정 조회
 *     tags: [ReminderSettings]
 *     responses:
 *       200:
 *         description: 현재 저장된 메시지와 스케줄 설정
 */
router.get('/', controller.getSettings);

/**
 * @swagger
 * /api/reminder-settings:
 *   put:
 *     summary: 메시지 및 예약 설정 저장
 *     tags: [ReminderSettings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               message:
 *                 type: string
 *               schedule:
 *                 type: object
 *     responses:
 *       200:
 *         description: 저장 완료
 */
router.put('/', controller.saveSettings);

/**
 * @swagger
 * /api/reminder-settings/manual:
 *   post:
 *     summary: 수동 발송 실행
 *     tags: [ReminderSettings]
 *     responses:
 *       200:
 *         description: 수동 발송 성공
 */
router.post('/manual', controller.sendManual);

module.exports = router;
