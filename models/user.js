'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // Class Level Methods
        static associate(models) {
            User.hasOne(models.UserAddress, {sourceKey: 'user_id', foreignKey: 'user_id'})
        }

        // Instance Level Methods
        getFullName() {
            return [this.first_name, this.last_name].join(' ');
        }
    }

    User.init({
        user_id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "uq_user_email"
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        date_of_birth: {
            type: DataTypes.DATE,
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
        modelName: 'User',
        version: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    });
    return User;
};
