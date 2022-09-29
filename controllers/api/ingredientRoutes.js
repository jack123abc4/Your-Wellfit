const router = require('express').Router();
const sequelize = require('../../config/connection');

const { Ingredient } = require('../../models');

router.put('/:id', async (req, res) => {
    try{
        const ingredientData = await Ingredient.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json(ingredientData);
    }
    catch (err) {
        res.status(500).json(err);
    }
    

})

module.exports = router;