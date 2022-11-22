const dayjs = require('dayjs');
const { Types, Schema } = require('mongoose');

const reactionModel = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDate) => dayjs(createdAtDate).format('MM/DD/YYYY HH:m a')
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  
  module.exports = reactionModel;