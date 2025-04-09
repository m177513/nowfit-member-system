// models/memberModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../database';  // Sequelize 인스턴스를 가져옴

const Member = sequelize.define('Member', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'members',
  timestamps: false
});

export default Member;
