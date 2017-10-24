/* jshint indent: 1 */
'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('calculatedWeights', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'id'
		},
		photoCountWeight: {
			type: DataTypes.JSON,
			allowNull: false,
			field: 'photo_count_weight'
		},
		createdAt: {
			type: DataTypes.TIME,
			allowNull: false,
			field: 'created_at'
		}
	}, {
		tableName: 'calculated_weights'
	});
};
