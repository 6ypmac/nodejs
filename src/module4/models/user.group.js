const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const UserGroup = sequelize.define('UserGroup', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    groupId: {
        type: DataTypes.UUID,
        allowNull: false
    }
});

module.exports = UserGroup;