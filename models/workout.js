const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class workout extends Model {}

workout.init(
    {
     id: {
            type: DataTypes.INTEGER,
            allownNull: false,
            primaryKey: true,
            autoIncrement: true,
    },
    exercise: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    bodypart: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    equipment: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    },
    {
        sequelize,
    timestamps: false,
    // freezeTableName: true,
    underscored: true,
    modelName: 'workout',
    }
);

module.exports = workout;