import { Router } from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById, 
    addFriend, 
    removeFriend,
} from '../../controllers/userController';

const router = Router();

// GET All the Users
router.get('/users', getAllUsers);

// GET a user by id and populate thought and friend data
router.get('/users/:id', getUserById);

// POST a new user
router.post('/users', createUser);

// PUT to update a user by its id
router.put('/users/:id', updateUserById);

// DELETE to remove user by its id
router.delete('/users/:id', deleteUserById);

// POST to add a new friend to a user's friend list
router.post('/users/userId/friends/:friendId', addFriend);

// DELETE to remove a friend from the user's friend list
router.delete('/users/:userId/friends/:friendId', removeFriend);

export default router;