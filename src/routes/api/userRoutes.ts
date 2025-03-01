import {Router} from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../../controllers/userController';

const router = Router();

// User Routes
router.route('/')
  .get(getUsers)
  .post(createUser);


// User Routes by ID
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


//Friend Routes
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

export default router;
