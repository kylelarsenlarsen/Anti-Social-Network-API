const { model, Schema } = require('mongoose');

const userModel = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Input a valid email address.'
        ]
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  userModel
    .virtual('friendCount')
    .get(function () {
      return `${this.friends.length}`;
    })
    .set(function (v) {
      this.set(function() {
        return `${v.friends.length}`
      })
    });
  
  const User = new model('User', userModel);
  
  module.exports = User;
  