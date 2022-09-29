const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Ingredient extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    food: {
      type: DataTypes.STRING,
    },
    food_category: {
        type: DataTypes.STRING,
    },
    food_id: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.TEXT,
    },
    measure: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.TEXT,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
  },
  ca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  chocdf: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  chole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fe: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  fibtg: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  k: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  na: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  procnt: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  sugar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    original: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    
    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recipe',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    // freezeTableName: true,
    underscored: true,
    modelName: 'ingredient',
  }
);

module.exports = Ingredient;
