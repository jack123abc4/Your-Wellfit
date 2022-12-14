
let clickMode = 'subtract';
let globalIngredientObject;
let globalIngredientElement;
const replaceModal = document.querySelector("#replace-modal");
const addModal = document.querySelector("#add-modal");
const recipeID = document.querySelector('.recipe-title').getAttribute("id");
// const foodID = process.env.API_ID;
// const foodKey = process.env.API_KEY;
const foodID = "ef193ade"
const foodKey = "472b382be6ee874666d1ada17c97d073"
const foodURL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=" + foodID + "&app_key=" + foodKey;

async function populateNutrition() {
    console.log("RECIPE ID",recipeID);
   

    const ingredientData = await fetch(`/api/recipes/ingredients/${recipeID}`, {
    method: 'GET'
    })
    .then((response) => response.json())
    .then(function (data) {
    console.log("RETURN FROM API",data);
    addIngredients(data);
    });
    
    
}

async function addIngredients(ingredientData) {
    const ingredientObjects = [];
    for (const ingredient of ingredientData) {
        console.log("INGREDIENT ", ingredient);
        console.log("BODY DATA",ingredient.quantity,ingredient.measure,ingredient.food_id);
        ingredientObjects.push(
            {   "id": ingredient.id,
                "ingredients": [{
                    "quantity": parseFloat(ingredient.quantity),
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
        console.log("BODY", body);
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
                // console.log(nutrient,data.totalNutrients,data.totalNutrients[nutrient].quantity);
                
                quantities[nutrient.toLowerCase()] = data.totalNutrients[nutrient].quantity;
            
            }
            quantities["calories"] = data.calories;
            console.log(quantities);
            
            // console.log(quantities);
            // const ingredients = ingredientData.map((ingredient) => 
            // ingredient.get({ plain: true }));
            console.log(JSON.stringify(quantities));
            const nutritionPut = fetch(`/api/ingredients/${i.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quantities)
                
            });

        });
    }
    updateNutrients();
}
    
async function updateNutrients() {
    nutritionList = document.querySelector("#nutrient-list");
    nutritionListSpans = nutritionList.querySelectorAll("span");
    const newNutrients = await fetch(`/api/recipes/updateNutrients/${recipeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(function (data) {
        console.log(data);
        for (const l of nutritionListSpans) {
            l.textContent = Math.round(data[l.getAttribute("id")]);
        }
    })
    
    
}

// async function updateNutrients() {
//     nutritionList = document.querySelector("#nutrient-list");
//     nutritionListSpans = nutritionList.querySelectorAll("span");
//     const newNutrients = await fetch(`/api/recipes/updateNutrients/${recipeID}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' }
//     })
//     .then(response => response.json())
//     .then(function (data) {
//         console.log(data);
//         for (const l of nutritionListSpans) {
//             l.textContent = Math.round(data[l.getAttribute("id")]);
//         }
//     })
    
    
// }

const ingredientClick = async (event) => {
    let eventTargetList = event.target;
    if (eventTargetList.tagName === "A") {
        eventTargetList = eventTargetList.parentElement;
    }
    const eventTargetAnchor = eventTargetList.querySelector("a");

    console.log(eventTargetList,clickMode);
    const ingredientID = eventTargetList.getAttribute("id").split("-")[3];
      if (clickMode === 'subtract') {
        const numActive = await fetch(`/api/recipes/activeIngredients/${recipeID}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(function (data) {
            console.log("NUM ACTIVE",data.count);
            return data.count;
        });
        // console.log("ID:",ingredientID);
        const ingredientState = eventTargetAnchor.getAttribute("state");
        // console.log("State:",ingredientState);
        if (numActive > 1 || ingredientState === "inactive") {
            
            const response = await fetch(`/api/ingredients/${ingredientID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({active: ingredientState === "active" ? false : true})
                
            });
            // console.log(response.json());
            console.log("RECIPE ID",recipeID);
            // eventTargetAnchor.setAttribute("style", ingredientState === "active" ? 'text-decoration: line-through' : 'text-decoration: none');
            eventTargetAnchor.setAttribute("class", ingredientState === "active" ? 'btn btn-dark btn-lg active' : 'btn btn-primary btn-lg active');
            // class="btn btn-primary btn-lg active"
            eventTargetAnchor.setAttribute("state", ingredientState === "active" ? "inactive" : "active");
            updateNutrients();
            
        }
    }
    else if (clickMode === 'replace') {
        const ingredientObject = await fetch(`/api/ingredients/${ingredientID}`, {
            method: 'GET'
        })
        .then(response => response.json());
        console.log("INGR OBJ:", ingredientObject);
        
        // replaceModal.querySelector("p").innerHTML = ingredientObject.text;
        replaceModal.querySelector("#input-quantity").setAttribute("value",parseFloat(ingredientObject.quantity));
        replaceModal.querySelector("#input-measure").setAttribute("value",ingredientObject.measure);
        replaceModal.querySelector("#input-food").setAttribute("value",ingredientObject.food);
        globalIngredientObject = ingredientObject;
        globalIngredientElement = eventTargetAnchor;
    }
    
     
};

async function createIngredient(ingredientBody) {
    let i = await fetch(`/api/recipes/ingredient/${recipeID}`, {
        method: 'POST',
        body: JSON.stringify(ingredientBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json());
    console.log("CREATED INGREDIENT", i);
    const fullParseURL = "https://api.edamam.com/api/food-database/v2/parser?app_id="+ foodID + "&app_key=" + foodKey + "&ingr=" + ingredientBody.food + "&nutrition-type=cooking";
    const food_id = await fetch(fullParseURL, {
        method: 'GET', //GET is the default.
        })
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            return data.parsed[0].food.foodId;
        })
        .catch(function(error) {
            console.log(error);
        });
    i = await fetch(`/api/ingredients/${i.id}`, {
        method:'PUT',
        body: JSON.stringify({
            food_id: food_id,
            text: `${i.quantity} ${i.measure} ${i.food}`,
            original: false 
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json());
    console.log("NEW  INGREDIENT",i);
    await addIngredients([i]);
    await createIngredientEl(i)
    updateNutrients();
    // updateIngredients();    
}

async function createIngredientEl(ingredient) {
    const newListEl = document.createElement("li");
    const newAnchorEl = document.createElement("a");
    newListEl.setAttribute("class","ingredient-list-element");
    newListEl.setAttribute("id",`ingredient-list-element-${ingredient.id}`);
    newListEl.setAttribute("state","active");

    newAnchorEl.setAttribute("class", "btn btn-info btn-lg active");
    newAnchorEl.setAttribute("role", "button");
    newAnchorEl.setAttribute("aria-pressed", "false");
    newAnchorEl.setAttribute("state", "active");
    newAnchorEl.setAttribute("id", `ingredient-btn-${ingredient.id}`);
    newAnchorEl.setAttribute("data-toggle", "modal");
    
    newAnchorEl.innerHTML = ingredient.text;

    document.querySelector("#ingredient-list").appendChild(newListEl);
    newListEl.appendChild(newAnchorEl);

    newListEl.addEventListener('click', ingredientClick);
    updateNutrients();


    
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
        const ingredientElements = document.querySelector("#ingredient-list").querySelectorAll("a");
        // for (const el of ingredientElements) {
        //     el.setAttribute("data-target","#");
        // }
    }
    
}

const replaceBtnClick = async (event) => {
    if (clickMode === 'subtract') {
        clickMode = 'replace';
        replaceBtn.setAttribute("state", "active");
        replaceBtn.setAttribute("aria-pressed", "true");
        subtractBtn.setAttribute("state", "inactive");
        subtractBtn.setAttribute("aria-pressed", "false");
        const ingredientElements = document.querySelector("#ingredient-list").querySelectorAll("a");
        for (const el of ingredientElements) {
            el.setAttribute("data-target","#replace-modal");
        }
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

const saveBtnClick = async (event) => {
    saveBtn.setAttribute("state", saveBtn.getAttribute("state") === "saved" ? "unsaved" : "saved");
    saveBtn.innerHTML = saveBtn.getAttribute("state") === "saved" ? "Unsave" : "Save";
    await fetch(`/api/recipes/save/${recipeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({active: false})
    }) 
}

const resetBtnClick = async (event) => {
    location.reload();
}
const favBtnClick = async (event) => {
    if (clickMode !== 'fav') {
        clickMode = 'fav';
        favBtn.setAttribute("state", "active");
        favBtn.setAttribute("aria-pressed", "true");
        addBtn.setAttribute("state", "inactive");
        addBtn.setAttribute("aria-pressed", "false");
        replaceBtn.setAttribute("state", "inactive");
        replaceBtn.setAttribute("aria-pressed", "false");
        subtractBtn.setAttribute("state", "inactive");
        subtractBtn.setAttribute("aria-pressed", "false");
    }
}

const replaceModalBtnClick = async(event) => {
    const response = await fetch(`/api/ingredients/${globalIngredientObject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({active: false})
        
    });
    // console.log(response.json());
    console.log("RECIPE ID",recipeID);
    // event.target.setAttribute("style", ingredientState === "active" ? 'text-decoration: line-through' : 'text-decoration: none');
    globalIngredientElement.setAttribute("class", 'btn btn-dark btn-lg active');
    // class="btn btn-primary btn-lg active"
    globalIngredientElement.setAttribute("state","inactive");
    const newIngredientBody = {
        quantity: replaceModal.querySelector("#input-quantity").value,
        measure: replaceModal.querySelector("#input-measure").value,
        food: replaceModal.querySelector("#input-food").value
    }
    await createIngredient(newIngredientBody);
    // const newIngredientBody = { "quantity": ingredient.food, "
    // "ingredients": [{
    //     "quantity": parseFloat(ingredient.quantity),
    //     "measureURI": ingredient.measure,
    //     "foodId": ingredient.food_id
    // }]

    await updateNutrients();
}

const addModalBtnClick = async(event) => {
    const newIngredientBody = {
        quantity: addModal.querySelector("#input-quantity").value,
        measure: addModal.querySelector("#input-measure").value,
        food: addModal.querySelector("#input-food").value
    }
    await createIngredient(newIngredientBody);
    // const newIngredientBody = { "quantity": ingredient.food, "
    // "ingredients": [{
    //     "quantity": parseFloat(ingredient.quantity),
    //     "measureURI": ingredient.measure,
    //     "foodId": ingredient.food_id
    // }]

    await updateNutrients();
}

const subtractBtn = document.querySelector('#subtract-btn');
const replaceBtn = document.querySelector('#replace-btn');
const addBtn = document.querySelector('#add-btn');
const favBtn = document.querySelector('#fav-btn');
const saveBtn = document.querySelector("#save-btn");
const resetBtn = document.querySelector("#reset-btn");


subtractBtn.addEventListener('click', subtractBtnClick);
replaceBtn.addEventListener('click', replaceBtnClick);
saveBtn.addEventListener('click', saveBtnClick);
resetBtn.addEventListener('click', resetBtnClick);

const replaceModalBtn = document.querySelector("#replace-modal-btn");
replaceModalBtn.addEventListener('click', replaceModalBtnClick)

const addModalBtn = document.querySelector("#add-modal-btn");
addModalBtn.addEventListener('click', addModalBtnClick)



function init() {
    populateNutrition();
    const recipeLinkEl = document.querySelector("#recipe-link");
    const recipeURL = fetch(`/api/urls/shorten/${recipeID}`, {
        method: 'POST',
        body: JSON.stringify({url:"url"}),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(function (data) {
        recipeLinkEl.innerHTML = data.short_url;
        recipeLinkEl.setAttribute("href",data.long_url);
    });
    var servingInputs = document.querySelector('serving-size-input')
    for (var i = 0; i < servingInputs.length; i++) {
        var input = servingInputs[i]
        input.addEventListener('change', servingChanged)
    }}

init();

function servingChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateServingSize()
};

function updateServingSize() {
    var nutritionContainer = document.getElementsByClassName('recipe-items')[0];
    var recipeRows =  nutritionContainer.getElementsByClassName('recipe-row');
    var total = 0
    for (var i = 0; i < recipeRows.length; i++) {
        var recipeRow = recipeRows[i];
        var servingSizeEl = recipeRow.getElementsByClassName('serving-size')[0];
        var sizeInputEl =recipeRow.getElementsByClassName('serving-size-input')[0];
        // console.log(servingSizeEl, sizeInputEl);
        var servingSize = parseFloat(servingSizeEl.innerText);
        var size = sizeInputEl.value;
        // console.log(servingSize * size);
        total = total + (servingSize * size)
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('ingredient-list-element')[0].innerText = total;
};
  



