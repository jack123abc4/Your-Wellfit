const sequelize = require('../config/connection');

const workoutData = require('./workoutData.json')

const { User, Recipe, workout } = require('../models');
const userData = require('./userData.json');

const recipeData = require('./recipeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });


  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  
  for (const user of users) {
    console.log("password", user.password)
  };

  for (const recipe of recipeData) {
    await Recipe.create({
      ...recipe,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  



  process.exit(0);
};

seedDatabase();
