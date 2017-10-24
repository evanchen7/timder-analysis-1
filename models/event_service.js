/* jshint indent: 1 */
'use strict';


module.exports = function(sequelize, DataTypes) {
	return sequelize.define('eventService', {
		eventId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'event_id'
		},
		eventCreatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'event_created_at'
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'user_id'
		},
		startDate: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'start_date'
		}
	}, {
		tableName: 'event_service'
	});
};
