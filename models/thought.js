const dayjs = require('dayjs');
const reactionModel = require('./reaction.js');
const { model, Schema } = require('mongoose');

const thoughtModel = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDate) => dayjs(createdAtDate).format('MM/DD/YYYY HH:m a')
      },
      username: {
        type: String,
        required: true
      },
      reactions: [reactionModel]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  
  thoughtModel
    .virtual('reactionCount')
    .get(function () {
      return `${this.reactions.length}`;
    })
    .set(function (v) {
      this.set(function () {
        return `${v.reactions.length}`;
      });
    });
  
  const Thought = new model('Thought', thoughtModel);
  
  module.exports = Thought;