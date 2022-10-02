const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Recipe extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calories: {
        type: DataTypes.DECIMAL(30,20),
        allowNull: false,
        defaultValue: 0,
    },
    ca: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    chocdf: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    chole: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    fat: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    fe: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    fibtg: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    k: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    na: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    procnt: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    sugar: {
      type: DataTypes.DECIMAL(30,20),
      allowNull: false,
      defaultValue: 0,
    },
    yield: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    // freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Recipe;
