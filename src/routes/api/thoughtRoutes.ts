import { Router } from 'express';
import {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThoughtById,
  deleteThoughtById,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController';

const router = Router();

// GET all thoughts
router.get('/thoughts', getAllThoughts);

// GET a single thought by its _id
router.get('/thoughts/:id', getThoughtById);

// POST to create a new thought
router.post('/thoughts', createThought);

// PUT to update a thought by its _id
router.put('/thoughts/:id', updateThoughtById);

// DELETE to remove a thought by its _id
router.delete('/thoughts/:id', deleteThoughtById);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', addReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
