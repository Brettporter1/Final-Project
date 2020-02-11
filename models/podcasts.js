const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  podId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
