const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const Group = sequelize.define('Group', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    }
});

module.exports = Group;