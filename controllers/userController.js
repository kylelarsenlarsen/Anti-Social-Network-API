const ObjectId = require('mongodb').ObjectId;
const { User } = require('../models');

module.exports = {
    // logic that finds one user by their GUID.
    getSingleUser(req, res) {
        User.findOne({_id: ObjectId(req.params._id)}).select('-__v').then((user) => 
        !user ? res.status(400).json({message: 'No user found'}) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // logic that returns all users.
    getUsers(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    // logic that takes the data from the username and email fields and pass that to the database.
    createUser(req, res) {
        User.create(req.body).then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },

    // logic that deletes the body based on its objectid.
    deleteUser(req, res) {
        User.findOneAndDelete({_id: ObjectId(req.params._id)}, (err, results) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(results);
            }
        });
    },

    // logic that finds the user by guid and updates the username.
    updateUser(req, res) {
        const sort = {_id: ObjectId(req.params._id)};
        const update = {username: req.body.username};

        User.findOneAndUpdate(sort, update, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'Update user error'});
            }
        });

    },

    // logic that locates a user by id then adds a friend based of the id provided.
    addFriend(req, res) {
        const sort = {_id: ObjectId(req.params._id)};
        const update = {$push: {friends: ObjectId(req.body.friends)}};

        User.findOneAndUpdate(sort, update, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json({message: 'Add friend error'});
            }
        });
    },

    // the following logic updates friends by finding a user, updating their friends list, and pulls the friend according to the update.
    updateFriends(req, res) {
        const sort = {_id: ObjectId(req.params._id)};
        const update = {
            $pullAll: {
                friends: [{_id: req.body.friends}]
            }
        };

        User.findOneAndUpdate(sort, update, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(500).json(err);
            }
        });
    },
};