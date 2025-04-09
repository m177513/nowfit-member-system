// routes/memberRoutes.js
import express from 'express';
import { getMembers } from '../controllers/membersController';

const router = express.Router();

// 회원 목록 조회 API
router.get('/members', getMembers);

export default router;
