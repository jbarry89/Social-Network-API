import express from 'express';
import Reaction from '../../models/Reaction';
import Thought from '../../models/Thought';
import User from '../../models/User';
import mongoose from 'mongoose';

const router = express.Router();

// POST a new reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const { userId, reactionType } = req.body;
    const thoughtId = req.params.thoughtId;

    // Check if the thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ message: 'Invalid thoughtId format' });
    }

    // Check if the thought exists
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new reaction
    const newReaction = new Reaction({
      thoughtId,
      userId,
      reactionType,
    });

    await newReaction.save();
    res.status(201).json(newReaction);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // Check if the reaction exists
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Delete the reaction
    await reaction.deleteOne();
    res.status(200).json({ message: 'Reaction removed' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// GET all reactions for a specific thought
router.get('/:thoughtId/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    // Find all reactions for the thought
    const reactions = await Reaction.find({ thoughtId });
    res.status(200).json(reactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
