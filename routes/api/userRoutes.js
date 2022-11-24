const router = require('express').Router();
const {
    getSingleUser,
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    updateFriends
} = require('../../controllers/userController.js');

// the following routers will get a single user, all users, delete users, update friends, and add friends.
router.route('/:_id').get(getSingleUser);
router.route('/').get(getUsers).post(createUser);
router.route('/:_id').delete(deleteUser).put(updateUser);
router.route('/friends/:_id').put(addFriend);
router.route('/removeFriend/:_id').put(updateFriends);

module.exports = router;

