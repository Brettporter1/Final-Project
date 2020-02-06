const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
