"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_js_1 = __importDefault(require("../models/Leaderboard.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await Leaderboard_js_1.default.find()
        .populate('user', '-password')
        .sort({ score: -1, rank: 1 });
    res.json(entries);
});
router.get('/:id', async (req, res) => {
    const entry = await Leaderboard_js_1.default.findById(req.params['id']).populate('user', '-password');
    if (!entry)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    return res.json(entry);
});
router.post('/', async (req, res) => {
    const entry = new Leaderboard_js_1.default(req.body);
    const saved = await entry.save();
    res.status(201).json(saved);
});
router.put('/:id', async (req, res) => {
    const updated = await Leaderboard_js_1.default.findByIdAndUpdate(req.params['id'], req.body, {
        new: true,
        runValidators: true,
    }).populate('user', '-password');
    if (!updated)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    return res.json(updated);
});
router.delete('/:id', async (req, res) => {
    const deleted = await Leaderboard_js_1.default.findByIdAndDelete(req.params['id']);
    if (!deleted)
        return res.status(404).json({ message: 'Leaderboard entry not found' });
    return res.status(204).send();
});
exports.default = router;
