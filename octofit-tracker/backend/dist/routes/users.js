"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_js_1 = __importDefault(require("../models/User.js"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_js_1.default.find().select('-password');
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await User_js_1.default.findById(req.params['id']).select('-password');
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    return res.json(user);
});
router.post('/', async (req, res) => {
    const user = new User_js_1.default(req.body);
    const saved = await user.save();
    const obj = saved.toObject();
    const { password: _pw, ...safe } = obj;
    res.status(201).json(safe);
});
router.put('/:id', async (req, res) => {
    const updated = await User_js_1.default.findByIdAndUpdate(req.params['id'], req.body, {
        new: true,
        runValidators: true,
    }).select('-password');
    if (!updated)
        return res.status(404).json({ message: 'User not found' });
    return res.json(updated);
});
router.delete('/:id', async (req, res) => {
    const deleted = await User_js_1.default.findByIdAndDelete(req.params['id']);
    if (!deleted)
        return res.status(404).json({ message: 'User not found' });
    return res.status(204).send();
});
exports.default = router;
