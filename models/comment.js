const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    podcast: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Podcast',
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isOfComment: {
      type: Boolean,
      default: false,
    },
    mainCommentId: {
      type: String,
      default: null,
    },
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
