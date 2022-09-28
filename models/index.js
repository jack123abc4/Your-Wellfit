const Recipe = require("./Recipe");
const workout = require("./workout")
const User = require('./User');
const Ingredient = require('./Ingredient');

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

Recipe.hasMany(Ingredient, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
})

Ingredient.belongsTo(Recipe, {
  foreignKey: 'recipe_id'
})


User.hasMany(workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});
module.exports = { User, Recipe, Ingredient, workout};

