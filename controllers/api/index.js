const router = require('express').Router();
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');
const workoutRoutes = require('./workoutRoutes')

router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes)


module.exports = router;
