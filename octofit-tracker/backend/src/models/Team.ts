import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<ITeam>('Team', TeamSchema);
