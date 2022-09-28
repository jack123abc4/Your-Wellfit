// const sequelize = require('../../config/connection');
// const { User, Recipe, workout } = require('../../models');

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
        
        const response = await fetch('/api/recipes/batch', {
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
    .addEventListener('submit', searchFormHandler);

function searchTermToURL(searchTerm) {
    return ("https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99");
}

// async function createRecipes(recipeData) {
//     await sequelize.sync({ force: true });
   
//     const recipes = await Recipe.bulkCreate(recipeData);
//     console.log(recipes);
// }

// async function getResults(searchTerm) {
//     const fullURL = searchTermToURL(searchTerm);
//     const response = await fetch(fullURL, {
//         method: 'GET', //GET is the default.
//         })
//         .then(function (response) {
//             // console.log(response);
//             return response.json();
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
//     return response;
// }



    // var searchTerm = "fried chicken";
// var fullURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99"

// var mainDiv = document.querySelector("#card-div");
// var recipeHeader = document.querySelector("h2");
// var recipeParagraph = document.querySelector("p");
// var recipeList = document.querySelector("#recipe-list");
// var recipeImage = document.querySelector("img");
// var searchInput = document.querySelector("#recipe-search-input");
// var searchButton = document.querySelector("#recipe-search-btn");
// var recipeResults = [];

// var searchTerm;



// function displayMultipleRecipes(searchResults) {
//     recipeResults = [];
//     for (var i = 0; i < searchResults.hits.length; i++) {
//         var recipe = searchResults.hits[i].recipe;
//         recipeResults.push(recipe);
//         recipeThumbnail = createRecipeThumbnail(recipe);
//         console.log("rec thumb",recipeThumbnail);
//         var thumbnailDiv = recipeThumbnail.querySelector("div");
//         var parentThumbnailDiv = $(thumbnailDiv).parent();
//         $(thumbnailDiv).attr("id", "recipe-thumbnail-" + i);
//         $(parentThumbnailDiv).attr("id", "recipe-thumbnail-" + i);
//         $(thumbnailDiv).addClass("recipe-thumbnail", "search-result");
//         $(parentThumbnailDiv).addClass("recipe-thumbnail", "search-result");
//         console.log("child,parent",thumbnailDiv,parentThumbnailDiv);
//         recipeList.appendChild(thumbnailDiv);
//     }
//     console.log(recipeResults);
// }



// function clickListener(event) {
//     var targetEl = event.target;
//     if (targetEl.classList.contains("search-result")) {
//         if (!targetEl.getAttribute("id")) {
//             targetEl = $(targetEl).parent();
//         }
//         console.log("target element",targetEl);
//         console.log("children",$(targetEl).children());
//         console.log("parent",$(targetEl).parent());
//         console.log("grandparent",$(targetEl).parent().parent());
//         var grandparent = $(targetEl).parent().parent();
//         var recipeNum = grandparent.attr("id").split("-")[2];
//         var recipe = recipeResults[recipeNum];
//         document.location.replace('./singleResult.html?search=' + searchTerm + "&num=" + recipeNum);
//     }
// }


