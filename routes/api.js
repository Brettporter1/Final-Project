const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

require('dotenv').config();

const secret = process.env.SECRET || 'what';

/* GET users listing. */
router.get('/', function(req, res, next) {
  // testUser.save(err => {
  //   if (err) throw err;
  //   console.log('user created');
  // });
  res.json('respond with a resource');
});
router.get(
  '/check-user',
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    res.json(req.user);
  }
);

router.get('/searchpodcasts/:term', function(req, res, next) {
  const { term } = req.params;
  let podcasts;
  console.log(term);
  axios
    .get(`https://itunes.apple.com/search?media=podcast&term=${term}`)
    .then(response => {
      // console.log(response);
      podcasts = response.data;
      console.log(podcasts);
      res.json(podcasts);
    })
    .catch(err => {
      console.log(err);
    });
});
router.post('/rss', function(req, res, next) {
  const { url } = req.body;
  console.log(url);
  axios
    .get(url)
    .then(response => {
      // console.log(response);
      const options = {
        ignoreComment: true,
        alwaysChildren: false,
        compact: true,
        ignoreCdata: false,
      };
      const rssJson = convert.xml2js(response.data, options);
      console.log(rssJson);
      res.json(rssJson.rss.channel.item);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/register', function(req, res, next) {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      const error = 'Email  Exists in Database.';
      return res.status(400).json(error);
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => res.status(400).json(err));
      });
    });
  });
  console.log('user created');
});

router.post('/login', function(req, res, next) {
  const { email } = req.body;
  const { password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      // errors.email = 'No Account Found';
      return res.status(404).json('no account found');
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.userName,
        };
        jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
          if (err)
            res.status(500).json({ error: 'Error signing token', raw: err });
          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        // errors.password = 'Password is incorrect';
        res.status(400).json('password incorrect');
      }
    });
  });
});

module.exports = router;
