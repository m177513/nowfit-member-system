// gym/backend/config/database.js

import { Sequelize } from 'sequelize';

// MariaDB 연결 설정
const sequelize = new Sequelize('gym', 'root', '003205', {
  host: 'localhost', // 또는 MariaDB 서버의 주소
  dialect: 'mysql',  // MariaDB는 MySQL로 처리
  logging: false,    // 쿼리 로그를 출력하지 않으려면 false로 설정
});

export default sequelize;
