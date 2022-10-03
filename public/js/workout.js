const logFiller = async (event) => {
  event.preventDefault();
  console.log("buttonclick");

  const exercise = document.querySelector("#exerciseInput").value.trim();
  const sets = document.querySelector("#setsInput").value.trim();
  const reps = document.querySelector("#repsInput").value.trim();
  const weight = document.querySelector("#weightInput").value.trim();
  const comments = document.querySelector("#comments").value.trim();

  if (exercise && sets && reps && weight) {
    console.log("hasFields");
    const body = JSON.stringify({ exercise, sets, reps, weight, comments });
    console.log(body);

    const response = await fetch(`/api/workouts/add`, {
      method: "POST",
      body: JSON.stringify({ exercise, sets, reps, weight, comments }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
      });

    // if (response.ok) {
    document.location.replace("/workout");
    // } else {
    //   alert('Failed to create workout');
    // }
  }
};

const deleteBtn = document.getElementsByClassName('btn-delete');
console.log(deleteBtn);
for (var i = 0; i < deleteBtn.length; i++) {
    const button = deleteBtn[i];
    button.addEventListener('click', removeWorkout)
};

function removeWorkout(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
};

const delButtonHandler = async (event) => {
	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		const response = await fetch(`/api/workouts/${id}`, {
			method: 'DELETE',
		});

		// if (response.ok) {
		// 	document.location.replace('/workouts');
		// } else {
		// 	alert('Failed to delete workout');
		// }
	}
};

const logButton = document.querySelector("#testlog");
console.log(logButton);
logButton.addEventListener("submit", logFiller);

document
	.querySelector('.workout-log')
	.addEventListener('click', delButtonHandler);
