import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  score: number;
  rank: number;
}

const LeaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 0 },
});

export default mongoose.model<ILeaderboardEntry>('Leaderboard', LeaderboardSchema);
