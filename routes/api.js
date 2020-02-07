const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const User = require('../models/user');

const router = express.Router();

const testUser = User({
  username: 'Asshat',
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  penisUser.save(err => {
    if (err) throw err;
    console.log('user created');
  });
  res.json('respond with a resource');
});

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
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }

      const authenticate = User.authenticate();
      authenticate(req.body.username, req.body.password, function(err, result) {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.json('new user created');
      });
    }
  );
  console.log('user created');

  res.json('respond with a resource');
});

router.post('/login', function(req, res, next) {
  User.register(
    new User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }

      const authenticate = User.authenticate();
      authenticate(req.body.username, req.body.password, function(err, result) {
        if (err) {
          console.log(err);
          return next(err);
        }
        res.json('new user created');
      });
    }
  );
  console.log('user created');

  res.json('respond with a resource');
});

module.exports = router;
