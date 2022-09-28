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
