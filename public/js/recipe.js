let clickMode = 'subtract';


const ingredientClick = async (event) => {
    // console.log(event.target);
      if (clickMode === 'subtract')
     { const ingredientID = event.target.getAttribute("id").split("-")[3];
        // console.log("ID:",ingredientID);
        const ingredientState = event.target.getAttribute("state");
        // console.log("State:",ingredientState);
        const response = await fetch(`/api/ingredients/${ingredientID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({active: ingredientState === "active" ? false : true})
            
        });
        // console.log(response.json());
        const recipeID = response.recipe_id;
        event.target.setAttribute("style", ingredientState === "active" ? 'text-decoration: line-through' : 'text-decoration: none');
        event.target.setAttribute("state", ingredientState === "active" ? "inactive" : "active");
        const newNutrients = await fetch(`/api/recipes/updateNutrients/${recipeID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
    }
     
}
  
const listEls = document.querySelectorAll('.ingredient-list-element');
for (const el of listEls) {
    el.addEventListener('click', ingredientClick);
}

const subtractBtnClick = async (event) => {
    if (clickMode === 'replace') {
        clickMode = 'subtract';
        subtractBtn.setAttribute("state", "active");
        subtractBtn.setAttribute("aria-pressed", "true");
        replaceBtn.setAttribute("state", "inactive");
        replaceBtn.setAttribute("aria-pressed", "false");
    }
}

const replaceBtnClick = async (event) => {
    if (clickMode === 'subtract') {
        clickMode = 'replace';
        replaceBtn.setAttribute("state", "active");
        replaceBtn.setAttribute("aria-pressed", "true");
        subtractBtn.setAttribute("state", "inactive");
        subtractBtn.setAttribute("aria-pressed", "false");
    }
}

const subtractBtn = document.querySelector('#subtract-btn');
const replaceBtn = document.querySelector('#replace-btn');

subtractBtn.addEventListener('click', subtractBtnClick);
replaceBtn.addEventListener('click', replaceBtnClick);

