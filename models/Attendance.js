// Version: 4.5_04_02_007

const db = require('../config/db');

const Attendance = {
  create: (memberId, callback) => {
    const query = 'INSERT INTO attendance (member_id, checkin_time) VALUES (?, NOW())';
    db.query(query, [memberId], callback);
  },

  findAll: (callback) => {
    const query = `
      SELECT a.id, m.회원명, a.checkin_time
      FROM attendance a
      JOIN members m ON a.member_id = m.id
      ORDER BY a.checkin_time DESC
    `;
    db.query(query, callback);
  },

  getTotalByMember: (memberId, callback) => {
    const query = 'SELECT COUNT(*) AS total_attendance FROM attendance WHERE member_id = ?';
    db.query(query, [memberId], callback);
  },

  getDatesByMember: (memberId, callback) => {
    const query = 'SELECT DATE(checkin_time) AS date FROM attendance WHERE member_id = ? ORDER BY checkin_time DESC';
    db.query(query, [memberId], callback);
  },

  getDailyStats: (callback) => {
    const query = `
      SELECT DATE(checkin_time) AS date, COUNT(*) AS count
      FROM attendance
      GROUP BY DATE(checkin_time)
      ORDER BY date DESC
    `;
    db.query(query, callback);
  }
};

module.exports = Attendance;
