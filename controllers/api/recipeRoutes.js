const router = require('express').Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');

const { User, Recipe, Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');

router.put('/updateNutrients/:id', async (req, res) => {
  console.log("paramsID",req.params.id);
  
  await sequelize.query(`
  UPDATE recipes, (
    SELECT 
        SUM(calories) AS total_calories,
        SUM(ca) AS total_calcium,
        SUM(chocdf) AS total_carbs,
        SUM(chole) AS total_cholesterol,
        SUM(fat) AS total_fat,
        SUM(fe) AS total_iron,
        SUM(fibtg) AS total_fiber,
        SUM(k) AS total_potassium,
        SUM(na) AS total_sodium,
        SUM(procnt) AS total_protein,
        SUM(sugar) AS total_sugar
    FROM ingredients
    WHERE recipe_id=${req.params.id} AND active=1
) AS src
SET 
    calories = src.total_calories,
    ca = src.total_calcium,
    chocdf = src.total_carbs,
    chole = src.total_cholesterol,
    fat = src.total_fat,
    fe = src.total_iron,
    fibtg = src.total_fiber,
    k = src.total_potassium,
    na = src.total_sodium,
    procnt = src.total_protein,
    sugar = src.total_sugar
  WHERE
    id=${req.params.id};
  `);
  const recipeToUpdate = await Recipe.findByPk(req.params.id);
  return res.status(200).json(recipeToUpdate.get({plain:true}))

});



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

router.get('/activeIngredients/:id', async (req,res) => {
  return res.status(200).json(await sequelize.query(`
  SELECT COUNT(active) AS count FROM ingredients 
  WHERE recipe_id=${req.params.id} AND active=1; 
  `, { type: QueryTypes.SELECT, plain : true }))
})

router.get('/nutrients/:id'), async (req, res) => {
  
}

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
