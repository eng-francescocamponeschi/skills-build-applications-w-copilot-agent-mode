import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  exercises: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  exercises: [{ type: String }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
