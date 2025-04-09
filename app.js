// Version: 4.5_04_05_002

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// 환경설정
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// 기본 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ routes 폴더 구조 반영한 라우터 경로 설정

// 📂 members
app.use('/api/members', require('./routes/members/memberRoutes'));
app.use('/api/attendance', require('./routes/members/attendanceRoutes'));
app.use('/api/body-metrics', require('./routes/members/bodyMetricsRoutes'));
app.use('/api/consultation', require('./routes/members/consultationRoutes'));
app.use('/api/diet', require('./routes/members/dietRoutes'));
app.use('/api/diet-stats', require('./routes/members/dietStatsRoutes'));
app.use('/api/media', require('./routes/members/mediaRoutes'));
app.use('/api/membership-alert', require('./routes/members/membershipAlertRoutes'));
app.use('/api/member-stats', require('./routes/members/memberStatsRoutes'));
app.use('/api/points', require('./routes/members/pointRoutes'));
app.use('/api/referral', require('./routes/members/referralRoutes'));
app.use('/api/status', require('./routes/members/statusRoutes'));
app.use('/api/search', require('./routes/members/searchRoutes'));
app.use('/api/users', require('./routes/members/userRoutes'));

// 📂 exercise
app.use('/api/exercise-stats', require('./routes/exercise/exerciseStatsRoutes'));
app.use('/api/goal-stats', require('./routes/exercise/goalStatsRoutes'));

// 📂 pt
app.use('/api/pt', require('./routes/pt/ptRoutes'));
app.use('/api/pt-pass', require('./routes/pt/ptPassRoutes'));
app.use('/api/pt-stats', require('./routes/pt/ptStatsRoutes'));
app.use('/api/pt-detail', require('./routes/pt/ptDetailRoutes'));
app.use('/api/pt-schedule', require('./routes/pt/ptScheduleRoutes'));
app.use('/api/pt-auto-cancel', require('./routes/pt/ptAutoCancelRoutes'));
app.use('/api/pt-exercise', require('./routes/pt/exerciseRoutes'));
app.use('/api/pt-goal', require('./routes/pt/exerciseGoalRoutes'));

// 📂 system
app.use('/api/reminders', require('./routes/system/reminderRoutes'));
app.use('/api/reminder-settings', require('./routes/system/reminderSettingsRoutes'));
app.use('/api/reminder-stats', require('./routes/system/reminderStatsRoutes'));
app.use('/api/reminder-logs', require('./routes/system/reminderLogRoutes'));
app.use('/api/notifications', require('./routes/system/notificationAIRoutes'));
app.use('/api/notification-result', require('./routes/system/notificationRRoutes'));
app.use('/api/calendar', require('./routes/system/calendarRoutes'));
app.use('/api/statistics', require('./routes/system/statisticsRoutes'));
app.use('/api/summary-stats', require('./routes/system/summaryStatsRoutes'));

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

