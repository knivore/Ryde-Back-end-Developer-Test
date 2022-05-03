'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GeoLocation extends Model {
        // Class Level Methods
        static associate(models) {
        }

        // Instance Level Methods
    }

    GeoLocation.init({
        geo_id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_by: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        updated_date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'GeoLocation',
        version: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    });
    return GeoLocation;
}
