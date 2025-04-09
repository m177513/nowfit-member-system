// controllers/membersController.js
import { Member } from '../models';  // Sequelize 모델을 사용한다고 가정

// 회원 목록 조회 API
export const getMembers = async (req, res) => {
  try {
    const members = await Member.findAll(); // MariaDB에서 모든 회원 정보 조회
    res.status(200).json(members);  // 회원 목록 반환
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류: 회원 정보를 가져올 수 없습니다.' });
  }
};
