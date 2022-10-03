// const removeFavoriteItemButtons = document.getElementsByClassName('btn-danger');
// // console.log(removeFavoriteItemButtons);
// for (var i = 0; i < removeFavoriteItemButtons.length; i++) {
//     const button = removeFavoriteItemButtons[i];
//     button.addEventListener('click', removeFavorite)
// };

// function  removeFavorite(event) {
//     var buttonClicked = event.target;
//     buttonClicked.parentElement.parentElement.remove();
// };

// function flipSaveButton(buttonNum) {
//     var saveButton = document.querySelector("#favorite-btn")[buttonNum];
//     console.log(saveButton);
//     if (saveButton.state === "unsaved") {
//         saveButton.state = "saved";
//         saveButton.innerHTML = "Unsave"
//     }
//     else {
//         saveButton.state = "unsaved";
//         saveButton.innerHTML = "Save";
//     }
// }



// document.addEventListener("click", function(event) {
//     console.log(event.target);
//     console.log(event.target.tagName);
//     if (event.target.tagName === "BUTTON") {
//         console.log(event.target);
//         // console.log(event.target["id"]);
//         if (event.target["id"].includes("save-btn")) {
//             recipeNum = event.target["id"].split("-")[2]
//             console.log("Save button # " + recipeNum + " clicked");
//             flipSaveButton(recipeNum);
//             if (localStorage.getItem(recipeResults[recipeNum])) {
//                 localStorage.removeItem(recipeResults[recipeNum]);
//             }
//             else {
//                 localStorage.setItem(recipeResults[recipeNum], "saved");
//             }

//         }   
//     }
//     else if (event.target.classList.contains("search-result") && event.target.tagName === "IMG") {
//         var targetedEl = $(event.target);
//         var allImgEls = $("img")
//         console.log("og target",targetedEl[0]);
//         var targetNum = targetedEl[0].id.split("-")[2];
//         console.log(targetNum);
//         document.location.replace('./views/recipe.handlebars' + recipeResults[targetNum]);
        
//     }

// })




//  const listenForLikes = () => {
//     const likes = document.querySelector('#like')
//     like.forEach(like => {
//         like.addEventListener('click', (event) => {
//             event.target.classList.toggle('like-no');
//             event.target.classList.toggle('like-yes');
//             if (event.target.classList.contains('like-yes')) {
//                  getFavData(event.target);
//             } else {
//                 getFavData(event.target);
//             }
//         })
//     })
//  };

//  const getFavData = (elem) => {
//     const parent = elem.parentElement;
//     const img = parent.querySelector("img").src;
//     const name = parent.querySelector('h2').
// 
