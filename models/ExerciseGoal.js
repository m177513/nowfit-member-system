// Version: 4.5_04_03_007

class ExerciseGoal {
    constructor(data) {
      this.id = data.id;
      this.회원id = data.회원id;
      this.운동명 = data.운동명;
      this.목표무게 = data.목표무게;
      this.목표횟수 = data.목표횟수;
      this.설정일 = data.설정일;
      this.달성여부 = data.달성여부;
    }
  }
  
  module.exports = ExerciseGoal;
  