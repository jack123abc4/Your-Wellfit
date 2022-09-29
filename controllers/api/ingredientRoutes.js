const router = require('express').Router();
const sequelize = require('../../config/connection');

const { Ingredient } = require('../../models');

router.put('/:id', async (req, res) => {
    // try{
        const ingredientData = await Ingredient.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        const ingredient = await Ingredient.findByPk(req.params.id);
        // console.log(ingredient.get());
        // console.log(ingredient.get({plain:true}));
        res.status(200).json(ingredient.get());
    // }
    // catch (err) {
    //     res.status(500).json(err);
    // }
    

})

module.exports = router;