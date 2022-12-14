const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Workout, Image} = require('../models');

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
        {
          model: Image,
          attributes: ['image_link'],
        }
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

router.get('/recipe/:id', async (req, res) => {
  // try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Image,
          attributes: ['image_link'],
        }
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


router.get('/profile', withAuth,async (req, res) => {
  // try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    const savedRecipeData = await Recipe.findAll({
      where: {
       user_id: req.session.user_id,
       favorite: true
      },
      include: [
          {
            model: Image,
            attributes: ['image_link'],
          },
        ],
      
    });

    const savedRecipes = savedRecipeData.map((recipe) => recipe.get({ plain: true }));

    res.render('profile', {
      ...user,
      savedRecipes,
      logged_in: true
    });
    // res.status(200).json(savedRecipes);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get('/login', (req, res, next) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.get('/search',withAuth, (req, res) => {
    // if (req.session.logged_in) {
    //   res.redirect('/search');
    //   return;
    // }
  
    res.render('search');
  });

router.get('/searchResults', async (req, res) => {
  // try {
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
          {
            model: Image,
            attributes: ['image_link'],
          },
        ],
      });
      // r.image_link = (await(Image.findByPk(r.image_id))).image_link;
      // r.image_link = null;
      recipeData.push(r);
    };

    //console.log("RECIPE DATA",recipeData);

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log("RECIPES", recipes);

    // Pass serialized data and session flag into template
    res.render('searchResults', { 
      recipes, 
         logged_in: req.session.logged_in
    });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
})

  router.get('/recipe/:id', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/recipe');
      return;
    }
  
    res.render('recipe');
  });

  router.get("/workout", withAuth, async (req, res) => {
    try {
      const workoutData = await Workout.findAll();
      console.log(workoutData);
   
      const workouts = workoutData.map((workout) => workout.get({ plain: true }));
   
      res.render("workout", {
        workouts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
   
  router.get("/addworkout", async (req, res) => {
    try {
      const workoutData = await Workout.findAll();
      console.log(workoutData);
   
      const workouts = workoutData.map((workout) => workout.get({ plain: true }));
   
      res.render("addworkout", {
        workouts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
   
  // router.get("/editworkout/:id", async (req, res) => {
  //   try {
  //     const workoutData = await Workout.findByPk(req.params.id, {
  //       include: [
  //         {
  //           model: User,
  //           // attributes: ["username"],
  //         },
  //         {
  //           model: Workout,
  //           include: [User],
  //         },
  //       ],
  //     });
   
  //     const workout = workoutData.get({
  //       plain: true,
  //     });
   
  //     res.render("editworkout", {
  //       ...workout,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
   
  // router.get("/viewworkout/:id", async (req, res) => {
  //   try {
  //     const workoutData = await Workout.findByPk(req.params.id, {
  //       include: [
  //         {
  //           model: User,
  //           // attributes: ["username"],
  //         },
  //         {
  //           model: Workout,
  //           include: [User],
  //         },
  //       ],
  //     });
   
  //     const workout = workoutData.get({
  //       plain: true,
  //     });
   
  //     res.render("viewworkout", {
  //       ...workout,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
   
  router.get("/editworkout/:id", async (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/editworkout");
      return;
    }
   
    let workout = await Workout.findByPk(req.params.id)
    workout = await workout.get({plain:true})
    res.render("editworkout",{workout});
  });
  
  router.get("/viewworkout/:id", async (req, res) => {
    // if (req.session.logged_in) {
    //   res.redirect("/viewworkout");
    //   return;
    // }
   
    let workout = await Workout.findByPk(req.params.id)
    workout = await workout.get({plain:true})
    res.render("viewworkout",{workout});
  });
  

module.exports = router;