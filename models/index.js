'use strict';

const Sequelize = require('sequelize');
const SequelizeConfig = require('./config.js');
let db = new Sequelize(SequelizeConfig.connection);

const Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  userId: {
    type: Sequelize.INTEGER,
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

const userSwipes = db.define('userSwipes', {
  eventId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'event_id'
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  swipedId: {
    type: Sequelize.INTEGER,
    field: 'swiped_id'
  },
  swipe: {
    type: Sequelize.BOOLEAN,
    field: 'swipe'
  },
  timestamp: {
    type: Sequelize.TIME,
    field: 'timestamp'
  }
}, {
  tableName: 'user_swipes'
});

const UserWeights = db.define('userWeights', {
  weightId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'weight_id',
    autoIncrement: true
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  photoCountWeight: {
    type: Sequelize.JSON,
    field: 'photo_count_weight'
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  }
}, {
  tableName: 'user_weights'
});

//Relations between Users and UserWeights
//Users.hasMany(UserWeights);
//UserWeights.belongsTo(Users, {foreignKey: 'fk_user_id'});

//Relations between Users and userSwipes
//Users.hasMany(userSwipes);
//userSwipes.belongsTo(Users);


module.exports = {
  Sequelize: Sequelize,
  db: db,
  Users: Users,
  userSwipes: userSwipes,
  UserWeights: UserWeights
};
