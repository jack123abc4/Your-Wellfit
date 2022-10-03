
const router = require('express').Router();
const sequelize = require('../../config/connection');
const validUrl = require('valid-url');
const shortid = require('shortid');

const { User, Recipe, Ingredient, Image, Url } = require('../../models');
const baseUrl = 'http:localhost:3001';



router.post('/shorten/:id', async(req, res) => {
    const recipe = await Recipe.findByPk(req.params.id)
    
    
    const longUrl = recipe.url;
    
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }
    
    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
        // try {
            let url = await Url.findOne({
                longUrl
            });

            if (url) {
                res.json(url);
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = await Url.create({
                    long_url: longUrl,
                    short_url: shortUrl,
                    url_code: urlCode,
                })
                
                res.json(url);
            }
        // }
        // catch (err) {
        //     console.log(err);
        //     res.status(500).json('Server Error');
        // }
    }
    else {
        res.status(401).json('Invalid longUrl');
    }
})

router.get('/redirect/:code', async(req,res) => {
  try {
    const url = await Url.findOne({
        url_code: req.params.code
    })
    if (url) {
        return res.redirect(url.long_url);
    } else {
        return res.status(404).json('No URL Found');
    }
  }  
  catch (err) {
    console.error(err);
    res.status(500).json('Server Error');
  }
})

router.get('/:code', async(req,res) => {
    try {
      const url = await Url.findOne({
          url_code: req.params.code
      })
      if (url) {
          return res.status(200).json(url.long_url);
      } else {
          return res.status(404).json('No URL Found');
      }
    }  
    catch (err) {
      console.error(err);
      res.status(500).json('Server Error');
    }
  })


module.exports = router;