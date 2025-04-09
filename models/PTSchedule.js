// Version: 4.5_04_02_006

class PTSchedule {
  constructor(data) {
    this.id = data.id;
    this.회원id = data.회원id;
    this.강사 = data.강사;
    this.수업종류 = data.수업종류;
    this.수업일 = data.수업일;
    this.시작시간 = data.시작시간;
    this.종료시간 = data.종료시간;
    this.상태 = data.상태;
    this.메모 = data.메모;
    this.피드백 = data.피드백;
  }

  static fromRow(row) {
    return new PTSchedule({
      id: row.id,
      회원id: row.회원id,
      강사: row.강사,
      수업종류: row.수업종류,
      수업일: row.수업일,
      시작시간: row.시작시간,
      종료시간: row.종료시간,
      상태: row.상태,
      메모: row.메모,
      피드백: row.피드백,
    });
  }
}

module.exports = PTSchedule;
