import { Request, Response } from 'express';
import Thought from '../models/Thought';
import User from '../models/User';

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllThoughts = async (_: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.status(200).json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.status(200).json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};
