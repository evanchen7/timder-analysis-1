/* jshint indent: 1 */
'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('swipes', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'user_id'
		},
		noSwipe: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'no_swipe'
		},
		yesSwipe: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'yes_swipe'
		},
		matches: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'matches'
		},
		eventServiceEventId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'event_service',
				key: 'event_id'
			},
			field: 'event_service_event_id'
		}
	}, {
		tableName: 'swipes'
	});
};
