import mongoose, { Schema, Document } from 'mongoose';

interface IThought extends Document {
  thoughtText: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ThoughtSchema: Schema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Virtual to get reactions for a thought
ThoughtSchema.virtual('reactions', {
  ref: 'Reaction',
  localField: '_id',
  foreignField: 'thoughtId',
});

const Thought = mongoose.model<IThought>('Thought', ThoughtSchema);
export default Thought;
