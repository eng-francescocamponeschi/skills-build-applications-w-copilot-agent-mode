import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find()
    .populate('user', '-password')
    .sort({ score: -1, rank: 1 });
  res.json(entries);
});

router.get('/:id', async (req, res) => {
  const entry = await Leaderboard.findById(req.params['id']).populate('user', '-password');
  if (!entry) return res.status(404).json({ message: 'Leaderboard entry not found' });
  return res.json(entry);
});

router.post('/', async (req, res) => {
  const entry = new Leaderboard(req.body as object);
  const saved = await entry.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Leaderboard.findByIdAndUpdate(req.params['id'], req.body as object, {
    new: true,
    runValidators: true,
  }).populate('user', '-password');
  if (!updated) return res.status(404).json({ message: 'Leaderboard entry not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Leaderboard.findByIdAndDelete(req.params['id']);
  if (!deleted) return res.status(404).json({ message: 'Leaderboard entry not found' });
  return res.status(204).send();
});

export default router;
