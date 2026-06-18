"use strict";
/**
 * Seed the octofit_db database with test data.
 *
 * Usage: npm run seed
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_js_1 = __importDefault(require("../models/Activity.js"));
const Leaderboard_js_1 = __importDefault(require("../models/Leaderboard.js"));
const Team_js_1 = __importDefault(require("../models/Team.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const Workout_js_1 = __importDefault(require("../models/Workout.js"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Connecting to MongoDB at', MONGO_URI);
    await mongoose_1.default.connect(MONGO_URI);
    console.log('Connected. Clearing existing collections …');
    await Promise.all([
        User_js_1.default.deleteMany({}),
        Team_js_1.default.deleteMany({}),
        Activity_js_1.default.deleteMany({}),
        Leaderboard_js_1.default.deleteMany({}),
        Workout_js_1.default.deleteMany({}),
    ]);
    // ── Users ──────────────────────────────────────────────────────────────────
    console.log('Seeding users …');
    const users = await User_js_1.default.insertMany([
        { username: 'monalisa', email: 'monalisa@octofit.dev', password: 'hashed_pw_1' },
        { username: 'hubot', email: 'hubot@octofit.dev', password: 'hashed_pw_2' },
        { username: 'codercat', email: 'codercat@octofit.dev', password: 'hashed_pw_3' },
        { username: 'defunkt', email: 'defunkt@octofit.dev', password: 'hashed_pw_4' },
        { username: 'octocat', email: 'octocat@octofit.dev', password: 'hashed_pw_5' },
    ]);
    // ── Teams ──────────────────────────────────────────────────────────────────
    console.log('Seeding teams …');
    const teams = await Team_js_1.default.insertMany([
        {
            name: 'Octo Runners',
            description: 'A team of dedicated runners in the Octofit community.',
            members: [users[0]._id, users[1]._id, users[2]._id],
        },
        {
            name: 'Code Lifters',
            description: 'Developers who lift heavy code and weights.',
            members: [users[3]._id, users[4]._id],
        },
    ]);
    // ── Activities ─────────────────────────────────────────────────────────────
    console.log('Seeding activities …');
    await Activity_js_1.default.insertMany([
        { user: users[0]._id, activityType: 'Running', duration: 30, calories: 300, date: new Date('2026-06-10') },
        { user: users[1]._id, activityType: 'Cycling', duration: 45, calories: 400, date: new Date('2026-06-11') },
        { user: users[2]._id, activityType: 'Swimming', duration: 60, calories: 500, date: new Date('2026-06-12') },
        { user: users[3]._id, activityType: 'Running', duration: 20, calories: 200, date: new Date('2026-06-13') },
        { user: users[4]._id, activityType: 'Yoga', duration: 50, calories: 150, date: new Date('2026-06-14') },
        { user: users[0]._id, activityType: 'Hiking', duration: 90, calories: 700, date: new Date('2026-06-15') },
    ]);
    // ── Leaderboard ────────────────────────────────────────────────────────────
    console.log('Seeding leaderboard …');
    await Leaderboard_js_1.default.insertMany([
        { user: users[0]._id, score: 1000, rank: 1 },
        { user: users[4]._id, score: 950, rank: 2 },
        { user: users[2]._id, score: 900, rank: 3 },
        { user: users[1]._id, score: 850, rank: 4 },
        { user: users[3]._id, score: 800, rank: 5 },
    ]);
    // ── Workouts ───────────────────────────────────────────────────────────────
    console.log('Seeding workouts …');
    await Workout_js_1.default.insertMany([
        {
            name: 'Morning Cardio Boost',
            description: 'A quick 30-minute cardio session to start the day.',
            exercises: ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers'],
            difficulty: 'beginner',
        },
        {
            name: 'Full Body Strength',
            description: 'Compound movements for total body conditioning.',
            exercises: ['Squat', 'Deadlift', 'Bench Press', 'Pull-Up', 'Overhead Press'],
            difficulty: 'intermediate',
        },
        {
            name: 'HIIT Inferno',
            description: 'High-intensity interval training for maximum calorie burn.',
            exercises: ['Sprint Intervals', 'Box Jumps', 'Kettlebell Swings', 'Battle Ropes'],
            difficulty: 'advanced',
        },
        {
            name: 'Yoga Flow',
            description: 'Restorative yoga session focusing on flexibility and mindfulness.',
            exercises: ['Sun Salutation', "Warrior I", "Warrior II", 'Child Pose', 'Savasana'],
            difficulty: 'beginner',
        },
        {
            name: 'Core Crusher',
            description: 'Targeted core workout for stability and strength.',
            exercises: ['Plank', 'Russian Twists', 'Leg Raises', 'Bicycle Crunches', 'Ab Wheel'],
            difficulty: 'intermediate',
        },
    ]);
    console.log(`Seeded ${users.length} users, ${teams.length} teams, 6 activities, 5 leaderboard entries, 5 workouts.`);
    console.log('Done. Closing connection.');
    await mongoose_1.default.disconnect();
}
seed().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
