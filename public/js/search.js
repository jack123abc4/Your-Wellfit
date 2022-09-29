// const sequelize = require('../../config/connection');
// const { User, Recipe, workout } = require('../../models');

const nutrientsToInclude = ["CA", "CHOCDF", "CHOLE", "FAT", "FE", "FIBTG", "K", "NA", "PROCNT", "SUGAR"];
// const nutrientsToInclude = [{CA: 0}, {CHOCDF: 0}, {CHOLE: 0}, {FAT: 0}, {FE: 0}, {FIBTG: 0}, {K: 0}, {NA: 0}, {PROCNT: 0}, {SUGAR: 0}];
const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const searchTerm = document.querySelector('#recipe-search').value.trim();

    if (searchTerm) {
        const fullURL = searchTermToURL(searchTerm);
        const results = await fetch(fullURL, {
            method: 'GET', //GET is the default.
            })
            .then(function (response) {
                // console.log(response);
                return response.json();
            })
            .then(function (data) {
                //console.log(data);
                var recipe = data.hits[0].recipe;
                //console.log("RECIPE", recipe);
                return data;

            })
            .catch(function(error) {
                //console.log(error);
            });
        
        console.log("HITS", results.hits);
        const recipeData = results.hits.map(result => {
            // console.log(result);
            // console.log(result.recipe);
            // const nutrients = nutrientsToInclude.map((nutrient) => {
              
              // console.log(totalNutrients,totalNutrients.CA,totalNutrients.CA.quantity);
              const totalNutrients = result.recipe.totalNutrients;
            
            // });
            return {
              name: result.recipe.label, 
              calories: result.recipe.calories, 
              ca: totalNutrients.CA.quantity,
              chocdf: totalNutrients.CHOCDF.quantity,
              chole: totalNutrients.CHOLE.quantity,
              fat: totalNutrients.FAT.quantity,
              fe: totalNutrients.FE.quantity,
              fibtg: totalNutrients.FIBTG.quantity,
              k: totalNutrients.K.quantity,
              na: totalNutrients.NA.quantity,
              procnt: totalNutrients.PROCNT.quantity,
              sugar: totalNutrients.SUGAR.quantity,
              image: result.recipe.image,
              user_id: 1,
              ingredientLines: result.recipe.ingredientLines,
              ingredients: result.recipe.ingredients
              };
        });
        console.log("RECIPE DATA", JSON.stringify(recipeData));
        
        const response = await fetch('/api/recipes/batch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData),
            
          });
          // const foodID = "ef193ade";
          // const foodKey = "472b382be6ee874666d1ada17c97d073";
          // const foodURL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=" + foodID + "&app_key=" + foodKey;
          // console.log(foodURL);
          // const ingredient = await Ingredient.findByPk(req.params.id);
      
          // data = {
          //     "ingredients": [
          //       {
          //         "quantity": ingredient.quantity,
          //         "measureURI": ingredient.measure,
          //         "foodId": ingredient.food_id
          //       }
          //     ]
          //   }
          //   console.log(JSON.stringify(data));
          // const ingredientResponse = await fetch(foodURL, {
          //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //     mode: 'cors', // no-cors, *cors, same-origin
          //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //     credentials: 'same-origin', // include, *same-origin, omit
          //     headers: {
          //     'Content-Type': 'application/json'

          //     },
          //     redirect: 'follow',
          //     referrerPolicy: 'no-referrer', 
          //     body: JSON.stringify(data) 
          // });
          
          // console.log(ingredientResponse.json()); 
        //console.log("RESPONSE: ", response.json());
          if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/searchResults');
            //console.log("Success from search.js");
          } else {
            alert(response.statusText);
          }
  };
}
  
  document
    .querySelector('.search-form')
    .addEventListener('submit', searchFormHandler);

function searchTermToURL(searchTerm) {
    return ("https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99");
}
