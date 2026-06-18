import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params['id']).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
});

router.post('/', async (req, res) => {
  const user = new User(req.body as object);
  const saved = await user.save();
  const obj = saved.toObject() as unknown as Record<string, unknown>;
  const { password: _pw, ...safe } = obj;
  res.status(201).json(safe);
});

router.put('/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params['id'], req.body as object, {
    new: true,
    runValidators: true,
  }).select('-password');
  if (!updated) return res.status(404).json({ message: 'User not found' });
  return res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params['id']);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  return res.status(204).send();
});

export default router;
