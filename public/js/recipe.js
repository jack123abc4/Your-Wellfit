let clickMode = 'subtract';

async function populateNutrition(recipe) {
    const recipeID = document.querySelector('h2').getAttribute("id");
    console.log("RECIPE ID",recipeID);
    const foodID = "ef193ade";
    const foodKey = "472b382be6ee874666d1ada17c97d073";
    const foodURL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=" + foodID + "&app_key=" + foodKey;

    const ingredientData = await fetch(`/api/recipes/ingredients/${recipeID}`, {
    method: 'GET'
    })
    .then((response) => response.json())
    .then(function (data) {
    console.log("RETURN FROM API",data);
    return data;
    });
    
    const ingredientObjects = [];
    for (const ingredient of ingredientData) {
        console.log("INGREDIENT ", ingredient);
        ingredientObjects.push(
            {   "id": ingredient.id,
                "ingredients": [{
                    "quantity": ingredient.quantity,
                    "measureURI": ingredient.measure,
                    "foodId": ingredient.food_id
                }]
            }
        );  
    }

    console.log(JSON.stringify(ingredientObjects));
    for (const i of ingredientObjects) {
        const body = `
        {
            "ingredients": ${JSON.stringify(i.ingredients)}
    }
        `
        console.log(JSON.stringify(i.ingredients));
        await fetch(foodURL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
    
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', 
            body: body
        })
        .then((response) => response.json())
        .then(function (data) {
            console.log("INGREDIENT DATA", data);
            let quantities = {};
            for (const nutrient of Object.keys(data.totalNutrients)) {
                console.log(nutrient,data.totalNutrients,data.totalNutrients[nutrient].quantity);
                
                quantities[nutrient.toLowerCase()] = data.totalNutrients[nutrient].quantity;
            
            }
            quantities["calories"] = data.calories;
            console.log(quantities);
            
            // console.log(quantities);
            // const ingredients = ingredientData.map((ingredient) => 
            // ingredient.get({ plain: true }));
            console.log(JSON.stringify({
                ...data.totalNutrients
            }));
            const nutritionPut = fetch(`/api/ingredients/${i.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quantities)
                
            });

        });
    }
    
    
    
  }

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

const addBtnClick = async (event) => {
    if (clickMode !== 'add') {
        clickMode = 'add';
        addBtn.setAttribute("state", "active");
        addBtn.setAttribute("aria-pressed", "true");
        replaceBtn.setAttribute("state", "inactive");
        replaceBtn.setAttribute("aria-pressed", "false");
        subtractBtn.setAttribute("state", "inactive");
        subtractBtn.setAttribute("aria-pressed", "false");
    }
}

const subtractBtn = document.querySelector('#subtract-btn');
const replaceBtn = document.querySelector('#replace-btn');
const addBtn = document.querySelector('#add-btn');

subtractBtn.addEventListener('click', subtractBtnClick);
replaceBtn.addEventListener('click', replaceBtnClick);

populateNutrition();