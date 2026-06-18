import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  activityType: string;
  duration: number;
  calories: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
