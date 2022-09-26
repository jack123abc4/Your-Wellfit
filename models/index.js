const Recipe = require("./Recipe");
const User = require('./User');

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Recipe.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Recipe };