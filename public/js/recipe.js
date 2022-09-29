const ingredientClick = async (event) => {
    // console.log(event.target);
    const ingredientID = event.target.getAttribute("id").split("-")[3];
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
    // const newNutrients = await fetch(`/api/recipes/updateNutrients/${recipeID}`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' }
    // })
    
        
}
  
const listEls = document.querySelectorAll('.ingredient-list-element');
for (const el of listEls) {
    el.addEventListener('click', ingredientClick);
}
