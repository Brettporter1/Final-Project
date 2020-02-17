const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
