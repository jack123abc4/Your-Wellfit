const router = require('express').Router();
const sequelize = require('../../config/connection');
const { QueryTypes } = require('sequelize');

const { User, Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

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
    for (const recipe of req.body) {
      let recipeID = await sequelize.query(
        `SELECT id FROM recipes
        WHERE
        name="${recipe.name}"`, { type: QueryTypes.SELECT, plain : true }
      );

        //console.log("RECIPE ID", recipeID);
        if (!recipeID) {
          
          const currentRecipe = await Recipe.create(recipe);
          //console.log(recipe.name,recipe.calories);
          recipeID = await sequelize.query(
            `SELECT id FROM recipes
            WHERE
            name="${recipe.name}"`, { type: QueryTypes.SELECT, plain : true}
          );
          //console.log("Unique!", recipeID);
        }
        else {
          //console.log("Duplicate!", recipeID);
        }
      //console.log("Recipe decon",recipe);
      
      
      //console.log(`INSERT INTO current_recipes (recipe_id) VALUES (${recipeID.id})`)
      sequelize.query(`INSERT INTO current_recipes (recipe_id) VALUES (${recipeID.id})`);
      // db.query(INSERT r_id into current recipes)
    }

    res.status(200).json();
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});


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
