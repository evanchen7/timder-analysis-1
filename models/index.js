'use strict';

const Sequelize = require('sequelize');
const SequelizeConfig = require('./config.js');
let db = new Sequelize(SequelizeConfig.connection);

const User = db.define('userInfo', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'user_id'
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'gender'
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'location'
  },
  photoCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'photo_count'
  },
  swipesUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'swipes',
      key: 'user_id'
    },
    field: 'swipes_user_id'
  }
}, {
  tableName: 'user_info'
});

module.exports = {
  Sequelize: Sequelize,
  db: db,
  User: User
};
