const express = require('express');
const axios = require('axios');
const convert = require('xml-js');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');
const Comment = require('../models/comment');
const Podcast = require('../models/podcasts');
const Channel = require('../models/channels');
const Vote = require('../models/votes');

const { ObjectId } = mongoose.Types;
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
    const photo = cloudinary.url(req.user.photo, {
      width: 100,
      height: 100,
      crop: 'fill',
    });
    const response = { ...req.user, photo };
    res.json(response);
  }
);

router.get('/channel/:id', function(req, res, next) {
  const { id } = req.params;
  let podcasts;
  console.log(id);
  axios
    .get(`https://itunes.apple.com/lookup?id=${id}`)
    .then(response => {
      // console.log(response);
      podcasts = response.data;
      console.log(podcasts);
      res.json(podcasts.results[0]);
    })
    .catch(err => {
      console.log(err);
    });
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
router.get('/posts/:track', (req, res, next) => {
  console.log(req.params.track.replace(/~/g, '/').replace(/_/, '?'));
  Podcast.findOne({
    'data.guid._text': req.params.track.replace(/~/g, '/').replace(/_/, '?'),
  })
    .populate({
      path: 'comments',
      populate: [
        {
          path: 'user',
          model: 'User',
        },
        {
          path: 'votes',
          model: 'Vote',
        },
      ],
    })

    .exec((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
  // .catch(error => res.json(error));
});
router.get('/thread/:id', (req, res, next) => {
  console.log('req.params.id');
  console.log(req.params.id);
  Comment.findById(req.params.id)
    .populate([
      {
        path: 'user',
        model: 'User',
      },
      {
        path: 'votes',
        model: 'Vote',
      },
      {
        path: 'children',
        model: 'Comment',
        populate: [
          {
            path: 'user',
            model: 'User',
          },
          {
            path: 'votes',
            model: 'Vote',
          },
          {
            path: 'children',
            model: 'Comment',
            populate: [
              {
                path: 'user',
                model: 'User',
              },
              {
                path: 'votes',
                model: 'Vote',
              },
            ],
          },
        ],
      },
    ])
    .exec((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
});
router.post('/rss', function(req, res, next) {
  const { url } = req.body;
  console.log(url);
  axios
    .get(url)
    .then(async response => {
      // console.log(response);

      const options = {
        ignoreComment: true,
        alwaysChildren: false,
        compact: true,
        ignoreCdata: false,
      };
      const rssJson = convert.xml2js(response.data, options).rss.channel.item;
      rssJson.forEach(track => {
        if (track.guid._cdata) {
          track.guid._text = track.guid._cdata;
        }
      });
      console.log('rssJson');
      // console.log(rssJson);
      if (rssJson.length) {
        rssJson.forEach((track, i) => {
          Podcast.findOne(
            { 'data.guid._text': track.guid._text },
            (err, obj) => {
              if (obj) {
                track.comment_count = obj.comments.length;
              }
              if (i === rssJson.length - 1) {
                res.json(rssJson);
              }
            }
          );
        });
      } else {
        console.log(rssJson);
        res.json(rssJson);
      }
    })
    .catch(err => {
      console.log(err);
    });
});
router.post(
  '/follow',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const getChannel = () => {
      // sets up promise for async bullshit
      const promise = new Promise(resolve => {
        console.log(req.body.channel.collectionId);
        // search channels for match
        Channel.findOne(
          { 'data.collectionId': req.body.channel.collectionId },
          (err, thisChannel) => {
            // should be returning the channel it found
            console.log(err);
            console.log('getting channel...');
            // check if the channel exists

            if (!thisChannel) {
              console.log('making new channel record');
              // save a new one if it doesn't
              const NewChannel = new Channel({ data: req.body.channel });
              // add the user to it's followers object
              if (NewChannel.followers) {
                NewChannel.followers.push(ObjectId(req.user.id));
              } else {
                NewChannel.followers = [];
                NewChannel.followers.push(ObjectId(req.user.id));
              }
              // save it
              NewChannel.save((err, thisNewChannel) => {
                if (err) {
                  res.json(err);
                }
                console.log(thisNewChannel);
              });
              // if it did exist, just save the user to it
            } else {
              User.findOneAndUpdate(
                { _id: req.user.id },
                { $pull: { following: thisChannel._id } },
                (err, data) => {
                  console.log(err);
                  console.log(data);
                }
              );
              User.findOneAndUpdate(
                { _id: thisChannel._id },
                { $pull: { following: req.user.id } },
                (err, data) => {
                  console.log(err);
                  console.log(data);
                }
              );

              if (thisChannel.followers) {
                thisChannel.followers.push(ObjectId(req.user.id));
              } else {
                thisChannel.followers = [];
                thisChannel.followers.push(ObjectId(req.user.id));
              }
              thisChannel.save();
              console.log(thisChannel);
            }
            resolve(thisChannel);
          }
        );
      });
      return promise;
    };
    // get the user and add the channel to it
    const getUser = theChannel => {
      const promise = new Promise(resolve => {
        User.findById(req.user.id, (err, thisUser) => {
          console.log(err);
          thisUser.following.push(ObjectId(theChannel._id));
          thisUser.save();
          resolve(thisUser);
        });
      });
      return promise;
    };
    const channel = await getChannel();
    res.json(await getUser(channel));
  }
);
// Create comment and associate to podcast track
router.post(
  '/make-comment',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    console.log(req.body.parent);
    const getChannel = () =>
      new Promise(resolve => {
        console.log(req.body.channel.collectionId);
        Channel.findOne(
          { 'data.collectionId': req.body.channel.collectionId },
          (err, thisChannel) => {
            console.log(err);
            console.log('getting channel...');
            console.log(thisChannel);
            if (!thisChannel) {
              console.log('making new channel record');
              const NewChannel = new Channel({ data: req.body.channel });
              NewChannel.save((err, thisNewChannel) => {
                if (err) {
                  res.json(err);
                }
                console.log(thisNewChannel);
                resolve(thisNewChannel);
              });
            } else {
              resolve(thisChannel);
            }
          }
        );
      });

    const getTrack = chnl =>
      new Promise(resolve => {
        Podcast.findOne(
          { 'data.guid._text': req.body.podcast.guid._text },
          (err, foundTrack) => {
            if (err) {
              res.json(err);
            }
            if (!foundTrack) {
              console.log('track not found');
              const NewPodcast = new Podcast({
                data: req.body.podcast,
                channel: chnl._id,
              });
              NewPodcast.save((err, newTrack) => {
                if (err) {
                  res.json(err);
                }
                resolve(newTrack);
              });
            } else {
              resolve(foundTrack);
            }
          }
        );
      });

    const makeComment = trk => {
      const NewComment = new Comment({
        user: ObjectId(req.user.id),
        message: req.body.message,
        podcast: track._id,
        mainCommentId: req.body.parent || null,
      });

      NewComment.podcast = ObjectId(trk._id);
      NewComment.save((err, comment) => {
        if (err) {
          res.json(err);
        } else {
          Podcast.findById(comment.podcast, (error, podcast) => {
            podcast.comments.push(comment);
            podcast.save();
          });
          if (req.body.parent) {
            Comment.findById(req.body.parent, (error, parent) => {
              parent.children.push(comment);
              parent.save();
            });
          }

          res.json(comment);
        }
      });
    };

    const channel = await getChannel();
    console.log('got channel');
    console.log(channel._id);
    const track = await getTrack(channel);
    console.log('got track');
    console.log(track._id);
    makeComment(track);
  }
);
router.post(
  '/vote',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    let type = null;
    Vote.findOne({ user: req.user.id, target: req.body.target }, (err, obj) => {
      if (obj) {
        // eslint-disable-next-line prefer-destructuring
        type = obj.type;
        Vote.deleteOne({ _id: obj._id }, err => {
          if (err) console.log(err);
        });
      }
      if (type !== req.body.type) {
        const NewVote = new Vote({
          user: ObjectId(req.user.id),
          target: req.body.target,
          type: req.body.type,
        });
        NewVote.save((err, vote) => {
          if (err) {
            console.log(err);
          } else {
            Comment.findById(req.body.target, (error, comment) => {
              comment.votes.push(vote);
              comment.save();
              res.json(comment);
            });
          }
        });
      } else {
        res.json('deleted vote');
      }
    });
  }
);
router.post(
  '/register',
  [
    check('username', 'User name is required')
      .not()
      .isEmpty(),
    check('email', 'Please enter valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with at least 6 characters'
    ).isLength({ min: 6 }),
  ],
  (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, username, password, confirmPassword } = req.body;
    User.findOne({ email }).then(user => {
      if (user) {
        errors = { msg: 'Email  Exists in Database.' };
        return res.status(400).json({ errors: [errors] });
      }
      if (confirmPassword !== password) {
        errors = { msg: "Passwords don't match" };
        return res.status(400).json({ errors: [errors] });
      }
      const newUser = new User({ username, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          console.log(newUser);
          newUser.save((err, data) => {
            console.log(newUser);
            const payload = {
              id: newUser._id,
              name: newUser.userName,
            };
            jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
              if (err)
                res
                  .status(500)
                  .json({ error: 'Error signing token', raw: err });
              res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            });
          });
        });
      });
    });
    console.log('user created');
  }
);

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
try {
  router.post(
    '/image-upload/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
      const image = req.files.file;
      console.log(image);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {
          tags: 'express_sample',
        },
        (err, image) => {
          console.error(err);
          console.log('** file uploaded to Cloudinary service');
          console.log(image);
          return image;
        }
      );
      await User.findByIdAndUpdate(
        req.user.id,
        { photo: cloudinaryResponse.public_id },
        { new: true, useFindAndModify: false },
        user => {
          res.json(user); // ?
        }
      );
    }
  );
} catch {
  err => res.json(err);
}
module.exports = router;
