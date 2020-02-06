const express = require('express');
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
