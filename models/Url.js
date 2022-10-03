const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Url extends Model {

}

Url.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url_code: {
      type: DataTypes.TEXT
    },
    long_url: {
      type: DataTypes.TEXT,
      
    },
    short_url: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,
    timestamps: false,
    // freezeTableName: true,
    underscored: true,
    modelName: 'url',
  }
);

module.exports = Url;
