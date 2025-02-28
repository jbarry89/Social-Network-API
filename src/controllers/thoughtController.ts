import { Request, Response } from "express";
import Thought from "../models/Thought";

// Get all thoughts
export const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thoughts", error });
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = new Thought(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error creating thought", error });
  }
};

// Get thought by ID
export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thought", error });
  }
};

// Update thought by ID
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error updating thought", error });
  }
};

// Delete thought by ID
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: "Thought not found" });
    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting thought", error });
  }
};

// Adding a reaction
export const addReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId } = req.params;
    const reaction = req.body;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } }, // Push reaction into the reactions array
      { new: true, runValidators: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID" });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error adding reaction", error });
  }
};

//Remove reaction
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const { thoughtId, reactionId } = req.params;

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought found with this ID" });
    }

    res.json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error });
  }
};
