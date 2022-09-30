const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Workout} = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      recipes, 
         logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/workout', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const workoutData = await Workout.findAll();
    console.log(workoutData)

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('workout', { 
      workouts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/recipe/:id', async (req, res) => {
  // try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const recipe = recipeData.get({ plain: true });

    // let ingredientData = (await sequelize.query(
    //   `SELECT text FROM ingredients
    //     WHERE recipe_id = ${req.params.id}`))[0];
    // ingredientData = {ingredients: ingredientData.map((ingredient) => ingredient.text)};
    // // console.log(ingredientData);
    // //   console.log(recipe);
    const ingredientData = await Ingredient.findAll({
      where: {
        recipe_id: req.params.id
      }
    });
    
    const ingredients = ingredientData.map((ingredient) => 
      ingredient.get({ plain: true }));
    // console.log(ingredients);
    
    
    res.render('recipe', {
      recipe,
      ingredients,
      logged_in: req.session.logged_in
    });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/search', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/search');
      return;
    }
  
    res.render('search');
  });

router.get('/searchResults', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const currentRecipePks = (await sequelize.query("SELECT (recipe_id) FROM current_recipes"))[0];
    //console.log(currentRecipePks);
    const recipeData = [];

    for (const pk of currentRecipePks) {
      const r = await Recipe.findByPk(pk.recipe_id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
      recipeData.push(r);
    };

    //console.log("RECIPE DATA",recipeData);

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('searchResults', { 
      recipes, 
         logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

  router.get('/recipe/:id', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/recipe');
      return;
    }
  
    res.render('recipe');
  });

  router.get('/workout', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/workout');
      return;
    }
  
    res.render('workout');
  });

module.exports = router;
