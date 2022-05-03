'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserAddress extends Model {
        // Class Level Methods
        static associate(models) {
            UserAddress.belongsTo(models.GeoLocation, {foreignKey: 'geo_id'})
        }

        // Instance Level Methods
        getFullAddress() {
            return [this.address_line_1, this.address_line_2, this.address_line_3].join(' ');
        }
    }

    UserAddress.init({
        address_id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        address_line_1: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line_2: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address_line_3: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        country_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        postal_code: {
            type: DataTypes.STRING(255),
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
        modelName: 'UserAddress',
        version: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    });
    return UserAddress;
}
