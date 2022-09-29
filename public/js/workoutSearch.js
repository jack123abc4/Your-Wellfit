const newFormHandler = async (event) => {
    event.preventDefault();
  
    const exercise = document.querySelector('#workout-exercise').value.trim();
    const bodypart = document.querySelector('#workout-bodypart').value.trim();
    const equipment = document.querySelector('#workout-equipment').value.trim();
  
    if (exercise && bodypart && equipment) {
      const response = await fetch(`/api/workouts`, {
        method: 'POST',
        body: JSON.stringify({ exercise, bodypart, equipment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/workout');
      } else {
        alert('Failed to create workout');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/workout');
      } else {
        alert('Failed to delete workout');
      }
    }
  };
  
  document
    .querySelector('.new-workout-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.workout-list')
    .addEventListener('click', delButtonHandler);
  