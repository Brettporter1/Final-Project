const mongoose = require('mongoose');
const User = require('./user');
const Podcast = require('./podcasts');
const Comment = require('./comment');
// require('dotenv');
require('dotenv').config({ path: 'PORT' });

const connectDb = () =>
  mongoose.connect(process.env.DATABASE_URL.concat('/podchat'), {
    useNewUrlParser: true,
  });
const models = { User, Podcast, Comment };

module.exports = { models, connectDb };
