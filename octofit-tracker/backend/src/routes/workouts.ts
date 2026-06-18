import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params['id']);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  return res.json(workout);
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body as object);
  const saved = await workout.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Workout.findByIdAndUpdate(req.params['id'], req.body as object, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ message: 'Workout not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Workout.findByIdAndDelete(req.params['id']);
  if (!deleted) return res.status(404).json({ message: 'Workout not found' });
  return res.status(204).send();
});

export default router;
