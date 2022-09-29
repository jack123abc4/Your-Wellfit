const ingredientClick = async (event) => {
    console.log(event.target);
        
}
  
const listEls = document.querySelectorAll('.ingredient-list-element');
for (const el of listEls) {
    el.addEventListener('click', ingredientClick);
}
