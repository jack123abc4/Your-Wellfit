// // const sequelize = require('../../config/connection');
// // const { User, Recipe, workout } = require('../../models');

// const loginFormHandler = async (event) => {
//     event.preventDefault();
  
//     const searchTerm = document.querySelector('#workout-search').value.trim();

//     if (searchTerm) {
//         const fullURL = searchTermToURL(searchTerm);
//         const results = await fetch(fullURL, {
//             method: 'GET', //GET is the default.
//             })
//             .then(function (response) {
//                 // console.log(response);
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data);
//                 var recipe = data.hits[0].recipe;
//                 console.log("RECIPE", recipe);
//                 return data;

//             })
//             .catch(function(error) {
//                 console.log(error);
//             });
        
//         console.log("HITS", results.hits);
//         const recipeData = JSON.stringify(results.hits.map(result => {
//             // console.log(result);
//             // console.log(result.recipe);
//             return {name : result.recipe.label, calories : result.recipe.calories, user_id : 1};
//         }));
//         console.log("RECIPE DATA", recipeData);
        
//         const response = await fetch('/api/workout/exercise', {
//             method: 'POST',
//             body: recipeData,
//             headers: { 'Content-Type': 'application/json' },
//           });
      
//           if (response.ok) {
//             // If successful, redirect the browser to the profile page
//             document.location.replace('/searchResults');
//             console.log("Success from search.js");
//           } else {
//             alert(response.statusText);
//           }
//         // createRecipes(recipeData);
        
//   };
// }
  
//   document
//     .querySelector('.search-form')
//     .addEventListener('submit', loginFormHandler);

// // function searchTermToURL(searchTerm) {
// //     return ("https://api.edamam.com/api/recipes/v2?type=public&q=" + searchTerm + "&app_id=03f13ddd&app_key=02579918e4ba389d465eaa6dd2ed2a99");
// // }

// async function createRecipes(recipeData) {
//     await sequelize.sync({ force: true });
   
//     const recipes = await Recipe.bulkCreate(recipeData);
//     console.log(recipes);
// }

var drinkSearch = $("input#drinkSearch"); 
var drinkForm = $("form#drinkForm")

drinkForm.on("submit", function(event){
event.preventDefault(); 

var searchedDrink = $("#drinkSearch").val().trim(); 
window.location.href = `results.html?search=${searchedDrink}`
}); 

function renderDrink(result){
  
    result.forEach(function(data){
        var newTr = $("<tr>");
        newTr.append(data.drinkName);
        newTr.append("<br>" + data.ingOneOz + " oz " + "of " + data.ingOne);

        if (data.ingTwoOz && data.ingTwo) {
            newTr.append("<br>" + data.ingTwoOz + " oz " + "of " + data.ingTwo);
        }
        if (data.ingThreeOz && data.ingThree) {
            newTr.append("<br>" + data.ingThreeOz + " oz " + "of " + data.ingThree);
        }
        if (data.ingFourOz && data.ingFour) {
            newTr.append("<br>" + data.ingFourOz + " oz " + "of " + data.ingFour);
        }
        if (data.drinkNotes) {
            newTr.append("<br>" + data.drinkNotes);
        } 
       
        newTr.append("<br><br>")
        $("#searched").append(newTr); 
    })

}; 



