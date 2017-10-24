/* jshint indent: 1 */
'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userInfo', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'user_id'
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'gender'
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'location'
		},
		photoCount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'photo_count'
		},
		swipesUserId: {
			type: DataTypes.INTEGER,
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
};
