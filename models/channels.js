const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
