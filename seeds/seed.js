const sequelize = require('../config/connection');

const workoutData = require('./workoutData.json')

const { User, Recipe, workout } = require('../models');
const userData = require('./userData.json');

const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync();


  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("USER DATA: ", userData);
  

  for (const recipe of recipeData) {
    console.log("...recipe",{...recipe});
    await Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  



  process.exit(0);
};

seedDatabase();
