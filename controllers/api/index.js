const router = require('express').Router();
const recipeRoutes = require('./recipeRoutes');
const userRoutes = require('./userRoutes');

router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);

module.exports = router;
