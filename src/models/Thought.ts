import { Schema, model, Document } from 'mongoose';

// Define the structure of a Reaction document
const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,      
    },
  },
  {
    timestamps: false, // No timestamps needed here as we handle 'createdAt' explicitly
  }
);

// Define the structure of a Thought document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: typeof reactionSchema[];
}

// Create the schema for Thought
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Array of reactions (nested documents)
  },
  {
    toJSON: { getters: true }, // Enable getter methods
    toObject: { getters: true }, // Enable getter methods for toObject as well
  }
);

// Create the model from the schema
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
