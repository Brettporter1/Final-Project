const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
