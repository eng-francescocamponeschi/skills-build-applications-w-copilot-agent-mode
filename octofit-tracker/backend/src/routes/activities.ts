import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user', '-password').sort({ date: -1 });
  res.json(activities);
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params['id']).populate('user', '-password');
  if (!activity) return res.status(404).json({ message: 'Activity not found' });
  return res.json(activity);
});

router.post('/', async (req, res) => {
  const activity = new Activity(req.body as object);
  const saved = await activity.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Activity.findByIdAndUpdate(req.params['id'], req.body as object, {
    new: true,
    runValidators: true,
  }).populate('user', '-password');
  if (!updated) return res.status(404).json({ message: 'Activity not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Activity.findByIdAndDelete(req.params['id']);
  if (!deleted) return res.status(404).json({ message: 'Activity not found' });
  return res.status(204).send();
});

export default router;
