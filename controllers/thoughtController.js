const { Thought } = require('../models');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    // this controller logic gets a single thought by using the body payload with the objectid of the thought.
    getSingleThought(req, res) {
        Thought.findOne({ _id: ObjectId(req.params._id)}).select('-__v').then((thought) => !thought ? res.status(404).json({ message: 'No thoughts'}) : res.json(thought))
    },

    // this gets all thoughts.           
    getThoughts(req, res) {
        Thought.find().then((thoughts) => res.json(thoughts)).catch((err) => res.status(500).json(err));
    },

    // the following creates a new thought within the database.
    createThought(req, res) {
        Thought.create(req.body).then((dbThoughtData) => res.json(dbThoughtData)).catch((err) => res.status(500).json(err));
    },

    // code that deletes a thought by its guid.
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: ObjectId(req.params._id)}, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    },

    // logic that updates a thought by its id.
    updateThought(req, res) {
        const sort = {_id: ObjectId(req.params._id)};
        const update = {thoughtText: req.body.thoughtText};

        Thought.findOneAndUpdate(sort, update, (err, result) => {
            if (result ) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'Thought update error'})
            }
        });
    },

    // logic that finds one json object by id and adds a reaction.
    addReaction(req, res) {
        const sort = {_id: ObjectId(req.params._id)};
        const info = {
            reactionBody: req.body.reactionBody,
            username: req.body.username
        };
        const update = {$push: {reactions: info}};

        Thought.findOneAndUpdate(sort, update, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'Reaction error'});
            }
        });
    },

    // logic that updates a json object by id.
    updateReaction(req, res) {
        const sort = {thoughtId: ObjectId(req.params.thoughtId)};
        const update = {reactionBody: req.body.reactionBody};

        Thought.findOne(sort, (err, result) => {
            if (result) {
                Thought.findOneAndUpdate({_id: ObjectId(req.params._id)}, update, (err, results) => {
                    if (results) {
                        res.status(200).json(results);
                    } else {
                        res.status(500).json({message: 'Reaction update error'});
                    }
                })
            } else {
                res.status(500).json({message: 'Fetch error'});
            }
        });
    },
};