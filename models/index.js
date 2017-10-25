'use strict';

const Sequelize = require('sequelize');
const SequelizeConfig = require('./config.js');
let db = new Sequelize(SequelizeConfig.connection);

const Users = Sequelize.define('users', {
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
  }
}, {
  tableName: 'users'
});

const userSwipes = Sequelize.define('userSwipes', {
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'event_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    field: 'user_id'
  },
  swipedId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'swiped_id'
  },
  swipe: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'swipe'
  },
  timestamp: {
    type: Sequelize.TIME,
    allowNull: false,
    field: 'timestamp'
  },
  usersUserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'users_user_id'
  }
}, {
  tableName: 'user_swipes'
});

const UserWeights = Sequelize.define('userWeights', {
  weightId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: 'weight_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    field: 'user_id'
  },
  photoCountWeight: {
    type: Sequelize.JSON,
    allowNull: false,
    field: 'photo_count_weight'
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at'
  }
}, {
  tableName: 'user_weights'
});

module.exports = {
  Sequelize: Sequelize,
  db: db,
  Users: Users,
  userSwipes: userSwipes,
  UserWeights: UserWeights
};
