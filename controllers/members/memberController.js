// Version: 4.5_04_03_merged
const db = require('../../config/db');

// 전체 회원 조회
exports.getAllMembers = (req, res) => {
  const query = 'SELECT * FROM members ORDER BY id DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('회원 조회 오류:', err);
      return res.status(500).json({ error: '회원 조회 실패' });
    }
    res.json(results);
  });
};

// 회원 상세 조회
exports.getMemberById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: '조회 실패' });
    if (results.length === 0) return res.status(404).json({ error: '회원 없음' });
    res.json(results[0]);
  });
};

// 회원 검색
exports.searchMembers = (req, res) => {
  const { keyword } = req.query;
  const sql = `
    SELECT * FROM members
    WHERE 회원명 LIKE ? OR 전화번호 LIKE ? OR 회원번호 LIKE ?
  `;
  const kw = `%${keyword}%`;
  db.query(sql, [kw, kw, kw], (err, results) => {
    if (err) return res.status(500).json({ error: '검색 오류' });
    res.json(results);
  });
};

// 회원 등록
exports.createMember = (req, res) => {
  const member = req.body;
  const query = `
    INSERT INTO members (
      회원명, 아이디, 생년월일, 성별, 주소, 전화번호,
      프로그램, 시작일, 종료일, 최종방문일, 상태, 잔여일,
      잔여횟수, 옷, 락카번호, 회원번호, 담당자, 메모,
      포인트, 등록, 가입일, 구분
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    member.회원명, member.아이디, member.생년월일, member.성별, member.주소, member.전화번호,
    member.프로그램, member.시작일, member.종료일, member.최종방문일, member.상태, member.잔여일,
    member.잔여횟수, member.옷, member.락카번호, member.회원번호, member.담당자, member.메모,
    member.포인트, member.등록, member.가입일, member.구분
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('회원 등록 오류:', err);
      return res.status(500).json({ error: '회원 등록 실패' });
    }
    res.json({ message: '회원 등록 완료', id: result.insertId });
  });
};

// 회원 수정
exports.updateMember = (req, res) => {
  const id = req.params.id;
  const member = req.body;
  const query = `
    UPDATE members SET
      회원명=?, 아이디=?, 생년월일=?, 성별=?, 주소=?, 전화번호=?,
      프로그램=?, 시작일=?, 종료일=?, 최종방문일=?, 상태=?, 잔여일=?,
      잔여횟수=?, 옷=?, 락카번호=?, 회원번호=?, 담당자=?, 메모=?,
      포인트=?, 등록=?, 가입일=?, 구분=?
    WHERE id=?
  `;
  const values = [
    member.회원명, member.아이디, member.생년월일, member.성별, member.주소, member.전화번호,
    member.프로그램, member.시작일, member.종료일, member.최종방문일, member.상태, member.잔여일,
    member.잔여횟수, member.옷, member.락카번호, member.회원번호, member.담당자, member.메모,
    member.포인트, member.등록, member.가입일, member.구분, id
  ];
  db.query(query, values, (err) => {
    if (err) {
      console.error('회원 수정 오류:', err);
      return res.status(500).json({ error: '회원 수정 실패' });
    }
    res.json({ message: '회원 정보가 수정되었습니다.' });
  });
};

// 회원 삭제
exports.deleteMember = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM members WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('회원 삭제 오류:', err);
      return res.status(500).json({ error: '회원 삭제 실패' });
    }
    res.json({ message: '회원이 삭제되었습니다.' });
  });
};

// 회원 상태 변경
exports.updateStatus = (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  if (!['활동', '휴면', '탈퇴'].includes(status)) {
    return res.status(400).json({ error: '상태는 활동, 휴면, 탈퇴 중 하나여야 합니다.' });
  }
  db.query('UPDATE members SET 상태 = ? WHERE id = ?', [status, id], (err) => {
    if (err) {
      console.error('회원 상태 변경 오류:', err);
      return res.status(500).json({ error: '상태 변경 실패' });
    }
    res.json({ message: '회원 상태가 변경되었습니다.' });
  });
};

// 포인트 변경
exports.updatePoints = (req, res) => {
  const id = req.params.id;
  const { amount } = req.body;
  if (typeof amount !== 'number') {
    return res.status(400).json({ error: '포인트는 숫자여야 합니다.' });
  }
  db.query('UPDATE members SET 포인트 = 포인트 + ? WHERE id = ?', [amount, id], (err) => {
    if (err) {
      console.error('포인트 수정 오류:', err);
      return res.status(500).json({ error: '포인트 수정 실패' });
    }
    res.json({ message: '포인트가 수정되었습니다.' });
  });
};
