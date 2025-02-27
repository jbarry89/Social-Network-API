import mongoose, { Schema, Document } from 'mongoose';

// Reaction schema
interface IReaction extends Document {
  thoughtId: mongoose.Types.ObjectId; // Reference to the Thought
  userId: mongoose.Types.ObjectId; // Reference to the User
  reactionType: string; // Type of reaction (e.g., 'like', 'love')
  createdAt: Date; // Timestamp when the reaction was created
}

const ReactionSchema: Schema = new Schema(
  {
    thoughtId: {
      type: mongoose.Types.ObjectId,
      ref: 'Thought', // Reference to the Thought model
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    reactionType: {
      type: String,
      enum: ['like', 'love', 'wow', 'sad', 'angry'], // Possible reaction types
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true, // Ensure that virtuals are included in the output
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Reaction = mongoose.model<IReaction>('Reaction', ReactionSchema);
export default Reaction;
