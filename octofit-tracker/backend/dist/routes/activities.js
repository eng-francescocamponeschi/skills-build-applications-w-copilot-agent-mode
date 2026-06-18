"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_js_1 = __importDefault(require("../models/Activity.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_js_1.default.find().populate('user', '-password').sort({ date: -1 });
    res.json(activities);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_js_1.default.findById(req.params['id']).populate('user', '-password');
    if (!activity)
        return res.status(404).json({ message: 'Activity not found' });
    return res.json(activity);
});
router.post('/', async (req, res) => {
    const activity = new Activity_js_1.default(req.body);
    const saved = await activity.save();
    res.status(201).json(saved);
});
router.put('/:id', async (req, res) => {
    const updated = await Activity_js_1.default.findByIdAndUpdate(req.params['id'], req.body, {
        new: true,
        runValidators: true,
    }).populate('user', '-password');
    if (!updated)
        return res.status(404).json({ message: 'Activity not found' });
    return res.json(updated);
});
router.delete('/:id', async (req, res) => {
    const deleted = await Activity_js_1.default.findByIdAndDelete(req.params['id']);
    if (!deleted)
        return res.status(404).json({ message: 'Activity not found' });
    return res.status(204).send();
});
exports.default = router;
