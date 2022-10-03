const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/workouts/${id}`, {
			method: 'DELETE',
		});

    const rowEl = document.querySelector(`#row-${id}`).remove()

		// if (response.ok) {
		// 	document.location.replace('/workouts');
		// } else {
		// 	alert('Failed to delete workout');
		// }
	}
};

const removeWorkout = document.querySelectorAll('.delete-btn');
for (const el of removeWorkout) {
    el.addEventListener('click', delButtonHandler);
};
