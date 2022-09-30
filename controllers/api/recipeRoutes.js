const router = require('express').Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');

const { User, Recipe, Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/updateNutrients/:id', async (req, res) => {
//     const 

// }

// )


router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/batch', async (req, res) => {
  ////console.log("Route hit! Body: ", req.body);
  await sequelize.sync();
  // try {
    sequelize.query("DELETE FROM current_recipes");
    
    let currentRecipes = [];
    
    for (const recipe of req.body) {
      console.log("RECIPE YIELD",recipe.yield);
      let recipeID = await sequelize.query(
        `SELECT id FROM recipes
        WHERE
        name="${recipe.name}"`, { type: QueryTypes.SELECT, plain : true }
      );

        //console.log("RECIPE ID", recipeID);
        if (!recipeID) {
          
          const currentRecipe = await Recipe.create({
            ...recipe,
            yield: recipe.yield,
          });
          
          
          //console.log(recipe.name,recipe.calories);
          recipeID = await sequelize.query(
            `SELECT id FROM recipes
            WHERE
            name="${recipe.name}"`, { type: QueryTypes.SELECT, plain : true}
          );
          for (const ingredient of recipe.ingredients) {
            await Ingredient.create({
              ...ingredient,
              food_category: ingredient.foodCategory,
              food_id: ingredient.foodId,
              recipe_id: recipeID.id,
            });
          }
          //console.log("Unique!", recipeID);
        }
        else {
          //console.log("Duplicate!", recipeID);
        }
      //console.log("Recipe decon",recipe);
      currentRecipes.push(await Recipe.findByPk(recipeID.id));
      
      
      //console.log(`INSERT INTO current_recipes (recipe_id) VALUES (${recipeID.id})`)
      sequelize.query(`INSERT INTO current_recipes (recipe_id) VALUES (${recipeID.id})`);
      // db.query(INSERT r_id into current recipes)
    }
    console.log("CURRENT RECIPES", JSON.stringify(currentRecipes));

    res.status(200).json(JSON.stringify(currentRecipes));
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

router.get('/ingredients/:id', async (req, res) => {
  const ingredientData = await Ingredient.findAll({
    where: {
      recipe_id: req.params.id
    }
  });
  res.status(200).json(ingredientData);
})


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with this id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
