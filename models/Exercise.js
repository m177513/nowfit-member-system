// Version: 4.5_04_02_008

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  회원id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  날짜: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  부위: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  운동명: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  세트: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  반복: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  중량: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  메모: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'exercises',
  timestamps: false,
});

module.exports = Exercise;
