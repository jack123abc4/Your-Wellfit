const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#recipe-name').value.trim();
    const calories = document.querySelector('#recipe-calories').value.trim();
  
    if (name && calories) {
      const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: JSON.stringify({ name, calories }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create recipe');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };
  
  document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.recipe-list')
    .addEventListener('click', delButtonHandler);