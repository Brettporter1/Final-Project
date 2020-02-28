const mongoose = require('mongoose');
const Channel = require('./channels');

const podcastSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Channel,
    },
    data: mongoose.Schema.Types.Mixed,

    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
