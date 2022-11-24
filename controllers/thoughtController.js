const { Thought } = require('../models');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getSingleThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params._id)}).select('-__v').then((thought) => !thought ? res.status(404).json({ message: 'No thoughts'}) : res.json(thought))
    },

    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts)).catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
    }
}