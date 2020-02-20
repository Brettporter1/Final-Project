const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('about', { title: 'PODCHAT' });
});

module.exports = router;
