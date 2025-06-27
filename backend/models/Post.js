const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Post = sequelize.define('Post', {
  userId: { type: DataTypes.STRING, 
            allowNull: false },
  desc:   { type: DataTypes.STRING(500) },
  img:    { type: DataTypes.STRING },
  likes:  { type: DataTypes.JSON,    
            defaultValue: [] },
}, { timestamps: true });

module.exports = Post;