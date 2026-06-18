"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_js_1 = __importDefault(require("../models/Workout.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_js_1.default.find();
    res.json(workouts);
});
router.get('/:id', async (req, res) => {
    const workout = await Workout_js_1.default.findById(req.params['id']);
    if (!workout)
        return res.status(404).json({ message: 'Workout not found' });
    return res.json(workout);
});
router.post('/', async (req, res) => {
    const workout = new Workout_js_1.default(req.body);
    const saved = await workout.save();
    res.status(201).json(saved);
});
router.put('/:id', async (req, res) => {
    const updated = await Workout_js_1.default.findByIdAndUpdate(req.params['id'], req.body, {
        new: true,
        runValidators: true,
    });
    if (!updated)
        return res.status(404).json({ message: 'Workout not found' });
    return res.json(updated);
});
router.delete('/:id', async (req, res) => {
    const deleted = await Workout_js_1.default.findByIdAndDelete(req.params['id']);
    if (!deleted)
        return res.status(404).json({ message: 'Workout not found' });
    return res.status(204).send();
});
exports.default = router;
