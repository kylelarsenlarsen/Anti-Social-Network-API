const router = require('express').Router();
const {
    getSingleThought,
    getThoughts,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    updateReaction
} = require('../../controllers/thoughtController.js');

// router that gets thoughts and posts thoughts.
router.route('/').get(getThoughts).post(createThought);

// the following router will return one thought, json body, and GUID.
router.route('/:_id').get(getSingleThought).delete(deleteThought).put(updateThought);
router.route('/addReaction/:_id').put(addReaction);
router.route('/:_thoughtId/reactions/:_reactionId').put(updateReaction);

module.exports = router;

