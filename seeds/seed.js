const sequelize = require('../config/connection');
const Recipe = require('../models');
const workout = require('../models')
const workoutData = require('./workoutData.json')
const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const recipes = await Recipe.bulkCreate(recipeData, {
    // individualHooks: true,
    returning: true,
  });

const workout = await workout.bulkCreate(workoutData, {
  returning: true,
});


  process.exit(0);
};

seedDatabase();
