const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  coverPicture: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  followers: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  followings: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  desc: {
    type: DataTypes.STRING(70),
  },
  city: {
    type: DataTypes.STRING(50),
  },
}, {
  timestamps: true,
});

module.exports = User;