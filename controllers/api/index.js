const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const workoutRoutes = require('./workoutRoutes');
const customWorkoutRoutes = require('./customWorkoutRoutes');


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/ingredients',ingredientRoutes);
router.use('/workouts', workoutRoutes)
router.use('/customWorkout', customWorkoutRoutes)


module.exports = router;
