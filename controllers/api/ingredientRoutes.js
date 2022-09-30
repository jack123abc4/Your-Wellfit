const router = require('express').Router();
const sequelize = require('../../config/connection');
const fetch = require ('node-fetch');

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

// router.get('/parse/:id', async (req, res) => {

// })

router.put('/nutrients/:id', async (req, res) => {
    
}) 

module.exports = router;