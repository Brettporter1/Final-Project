const express = require('express');
const User = require('../models/user');

const router = express.Router();

const penisUser = User({
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

module.exports = router;
