import express from 'express';
import { getUsers,
        createUser,
        getUserById,
        updateUser,
        deleteUser } 
        from '../../controllers/userController';

const router = express.Router();

// Routes for users
router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
