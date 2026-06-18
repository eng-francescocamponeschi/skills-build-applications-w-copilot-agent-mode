import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members', '-password');
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params['id']).populate('members', '-password');
  if (!team) return res.status(404).json({ message: 'Team not found' });
  return res.json(team);
});

router.post('/', async (req, res) => {
  const team = new Team(req.body as object);
  const saved = await team.save();
  res.status(201).json(saved);
});

router.put('/:id', async (req, res) => {
  const updated = await Team.findByIdAndUpdate(req.params['id'], req.body as object, {
    new: true,
    runValidators: true,
  }).populate('members', '-password');
  if (!updated) return res.status(404).json({ message: 'Team not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Team.findByIdAndDelete(req.params['id']);
  if (!deleted) return res.status(404).json({ message: 'Team not found' });
  return res.status(204).send();
});

export default router;
