import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction'; // Import the reaction schema
import moment from 'moment';

interface IThought extends Document {
  thoughtText: string;
  username: string;
  createdAt: Date;
  reactions: typeof reactionSchema[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
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
    reactions: [reactionSchema], // reaction schema as an array of subdocuments
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        ret.createdAt = moment(ret.createdAt).format('MMM Do, YYYY [at] h:mm A');
        return ret;
      },
      getters: true, // Apply getters for any properties
    },
    toObject: {
      getters: true, // Apply getters for toObject conversion
    },
  }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Set up the schema to return virtuals when converting to JSON or object
thoughtSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (_doc, ret) => {
    ret.createdAt = moment(ret.createdAt).format("MMM Do, YYYY [at] h:mm A");
    return ret;
  },
});
thoughtSchema.set('toObject', {
  virtuals: true,
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
