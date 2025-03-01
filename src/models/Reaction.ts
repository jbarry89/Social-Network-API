import { Schema, Types } from 'mongoose';
import moment from "moment";

// Reaction schema (subdocument in Thought)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(), // Default is a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280, 
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt: Date) => moment(createdAt).format("MMM Do, YYYY [at] h:mm A"), // Format the ISO format timestamp
    },
  },
  {
    toJSON: {
      getters: true, // Apply getters for any properties
    },
    toObject: {
      getters: true, // Apply getters for toObject conversion
    },
  }
);

export default reactionSchema;
