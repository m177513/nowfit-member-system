// Version: 4.5_04_03_swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NowFit API 문서',
      version: '1.0.0',
      description: '나우핏 회원/PT/기록 통합 관리 시스템 API 명세서',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '개발 서버',
      },
    ],
  },
  apis: ['./routes/*.js'], // JSDoc 기반 문서 경로
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
