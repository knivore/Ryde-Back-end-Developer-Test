'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Friend extends Model {
        // Class Level Methods
        static associate(models) {
            Friend.belongsTo(models.User, {targetKey: 'friend_id', foreignKey: 'user_id'})
        }

        // Instance Level Methods
        getFullName() {
            return [this.first_name, this.last_name].join(' ');
        }
    }

    Friend.init({
        user_id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        friend_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: "uq_user_email"
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
        modelName: 'Friend',
        version: true,
        createdAt: 'created_date',
        updatedAt: 'updated_date'
    });
    return Friend;
};
