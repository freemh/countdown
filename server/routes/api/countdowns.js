var router = require('express').Router();
var multer = require('multer');
var mongoose = require('mongoose');
var Countdown = mongoose.model('Countdown');
var auth = require('../auth');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('entity');

// Preload article objects on routes with ':article'
router.param('countdown', function(req, res, next, slug) {
  Countdown.find(1)
    .then(function (countdown) {
      if (!countdown) { return res.sendStatus(404); }

      req.countdown = countdown;

      return next();
    }).catch(next);
});

router.get('/countdown', function(req, res, next) {
  return Promise.all([
    Countdown.find(1)
      .exec(),
  ]).then(function(results){
    return res.send({
      countdowns: results[0]
    });
  });
});


// Update the Countdown
router.put('/countdown/:countdown',auth.required, function(req, res, next) {
  Countdown.find(1).then(function(countdown) {

    let req_countdown = req.countdown[0];

    if(typeof req.body.launch_time !== 'undefined'){
      req_countdown.launch_time = req.body.launch_time;
    }

    if(typeof req.body.title !== 'undefined'){
      req_countdown.title = req.body.title;
    }

    if(typeof req.body.description !== 'undefined'){
      req_countdown.description = req.body.description;
    }

    if(typeof req.body.logo !== 'undefined'){
      req_countdown.logo = req.body.logo;
    }

    if(typeof req.body.facebook_url !== 'undefined'){
      req_countdown.facebook_url = req.body.facebook_url;
    }

    if(typeof req.body.twitter_url !== 'undefined'){
      req_countdown.twitter_url = req.body.twitter_url;
    }

    if(typeof req.body.behance_url !== 'undefined'){
      req_countdown.behance_url = req.body.behance_url;
    }

    req_countdown.save(function(err, countdown) {
      console.log(err);
      if (err) {
        return res.status(404).send(err); 
      }else {
        return res.send({
          countdown: req_countdown
        });
      }
    })

  });
})

// Upload Logo


//
//
// Upload
router.post('/upload', function (req, res, next) {
  upload(req, res, function(err) {
    if(err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }
    else {
      // Update database
      Countdown.find(1).then(function(countdown){
        countdown[0].logo = req.file.filename
        countdown[0].save(function(err, countdown) {
          console.log(err);
          if (err) {
            return res.status(404).send(err); 
          }
          else {
            return res.send({countdown});
          }
        })
      })

    }
  })
});

module.exports = router;