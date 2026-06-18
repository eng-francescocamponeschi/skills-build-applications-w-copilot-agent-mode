"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activities_js_1 = __importDefault(require("./routes/activities.js"));
const leaderboard_js_1 = __importDefault(require("./routes/leaderboard.js"));
const teams_js_1 = __importDefault(require("./routes/teams.js"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const workouts_js_1 = __importDefault(require("./routes/workouts.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        port,
        baseUrl,
        mongoUri,
    });
});
app.use('/api/users', users_js_1.default);
app.use('/api/teams', teams_js_1.default);
app.use('/api/activities', activities_js_1.default);
app.use('/api/leaderboard', leaderboard_js_1.default);
app.use('/api/workouts', workouts_js_1.default);
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(port, () => {
        console.log(`OctoFit backend running on ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
});
