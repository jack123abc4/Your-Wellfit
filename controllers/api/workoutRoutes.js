const router = require('express').Router();
const { Workout } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
  Workout.findAll({})
  .then(workoutData => res.json(workoutData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err)
  });
});

// router.get('/:id', (req, res) => {
//   Workout.findAll({
//           where: {
//               id: req.params.id
//           }
//       })
//       .then(workoutData => res.json(workoutData))
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       })
// });

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newWorkout = await Workout.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newWorkout);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/add', async (req, res) => {
  try {
    console.log(req.body)
    const newWorkout = await Workout.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(JSON.stringify(newWorkout));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: 'Log Deleted!' });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
