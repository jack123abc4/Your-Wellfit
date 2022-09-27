// const sequelize = require('../../config/connection');
// const { User, Recipe, workout } = require('../../models');

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const searchTerm = document.querySelector('#workout-search').value.trim();

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
                console.log(data);
                var recipe = data.hits[0].recipe;
                console.log("RECIPE", recipe);
                return data;

            })
            .catch(function(error) {
                console.log(error);
            });
        
        console.log("HITS", results.hits);
        const recipeData = JSON.stringify(results.hits.map(result => {
            // console.log(result);
            // console.log(result.recipe);
            return {name : result.recipe.label, calories : result.recipe.calories, user_id : 1};
        }));
        console.log("RECIPE DATA", recipeData);
        
        const response = await fetch('/api/workout/exercise', {
            method: 'POST',
            body: recipeData,
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/searchResults');
            console.log("Success from search.js");
          } else {
            alert(response.statusText);
          }
        // createRecipes(recipeData);
        
  };
}
  
  document
    .querySelector('.search-form')
    .addEventListener('submit', loginFormHandler);

// function searchTermToURL(searchTerm) {
//     return ("https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99");
// }

async function createRecipes(recipeData) {
    await sequelize.sync({ force: true });
   
    const recipes = await Recipe.bulkCreate(recipeData);
    console.log(recipes);
}



