const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class customworkout extends Model {}

customworkout.init(
    {

    }
)


module.exports = customworkout;