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

    const response = await fetch(`/api/workouts/edit`, {
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

const workoutId = document.querySelector('form').getAttribute('id').split('-')[1]

const currentWorkout = await fetch(`/api/workouts/${workoutId}`,{
  method: "GET",
  
})
.then(response => response.json())
const exercise = document.querySelector("#exerciseInput").value=currentWorkout.exercise;
const sets = document.querySelector("#setsInput").value=currentWorkout.sets;
const reps = document.querySelector("#repsInput").value=currentWorkout.reps;
const weight = document.querySelector("#weightInput").value=currentWorkout.weight;
const comments = document.querySelector("#comments").value=currentWorkout.comments;

const logButton = document.querySelector("#testlog");
console.log(logButton);
logButton.addEventListener("submit", logFiller);

