const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
