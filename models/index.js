const Recipe = require("./Recipe");
const Workout = require("./Workout")
const User = require('./User');
const Ingredient = require('./Ingredient');

const Ingredient = require('./Ingredient');

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

  User.hasMany(Workout, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Workout.belongsTo(User, {
    foreignKey: 'user_id'
  });

  // workout.hasMany(exercises, {
  //   foreignKey: 'workout_id',
  //   onDelete: 'CASCADE'
  // });

  // exercise.belongsTo(workout, {
  //   foreignKey: 'workout_id'
  // });

  // workout.hasMany(equipment, {
  //   foreignKey: 'workout_id',
  //   onDelete: 'CASCADE'
  // });

  // equipment.belongsTo(workout, {
  //   foreignKey: 'workout_id'
  // });

  // workout.hasMany(bodypart, {
  //   foreignKey: 'workout_id',
  //   onDelete: 'CASCADE'
  // });

  // bodypart.belongsTo(workout, {
  //   foreignKey: 'workout_id'
  // });

Recipe.hasMany(Ingredient, {
  foreignKey: 'recipe_id',
  onDelete: 'CASCADE'
})

Ingredient.belongsTo(Recipe, {
  foreignKey: 'recipe_id'
})

module.exports = { User, Recipe, Ingredient, Workout};


