// Version: 4.5_04_03_001
const db = require('../../config/db');

// 전체 사용자 조회
exports.getAllUsers = (req, res) => {
  db.query('SELECT id, 이름, 아이디, 역할, 상태, 가입일 FROM users ORDER BY id DESC', (err, results) => {
    if (err) {
      console.error('사용자 목록 오류:', err);
      return res.status(500).json({ error: '사용자 목록 조회 실패' });
    }
    res.json(results);
  });
};

// 사용자 등록
exports.createUser = (req, res) => {
  const { 이름, 아이디, 비밀번호, 역할 } = req.body;

  if (!이름 || !아이디 || !비밀번호 || !역할) {
    return res.status(400).json({ error: '모든 항목을 입력해주세요.' });
  }

  const query = `
    INSERT INTO users (이름, 아이디, 비밀번호, 역할, 상태, 가입일)
    VALUES (?, ?, ?, ?, '활성', NOW())
  `;
  const values = [이름, 아이디, 비밀번호, 역할];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('사용자 등록 오류:', err);
      return res.status(500).json({ error: '사용자 등록 실패' });
    }
    res.json({ message: '사용자가 등록되었습니다.', user_id: result.insertId });
  });
};

// 사용자 상태 변경
exports.updateUserStatus = (req, res) => {
  const id = req.params.id;
  const { 상태 } = req.body;

  if (!['활성', '비활성'].includes(상태)) {
    return res.status(400).json({ error: '상태는 "활성" 또는 "비활성"만 가능합니다.' });
  }

  db.query('UPDATE users SET 상태 = ? WHERE id = ?', [상태, id], (err) => {
    if (err) {
      console.error('상태 변경 오류:', err);
      return res.status(500).json({ error: '상태 변경 실패' });
    }
    res.json({ message: '상태가 변경되었습니다.' });
  });
};
