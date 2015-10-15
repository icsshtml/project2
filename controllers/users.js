var express = require('express'),
    router = express.Router(),
    User   = require('../models/user.js');

router.get('/new', function(req, res){
  res.render('users/new');
});

//after signing up, going to flight/new path
// router.post('users/new', function(req, res){
//   var flightTest = new Flight(req.body.flighting);
//
//   flighting.save(function(err, newFlight){
//     if(err){
//       console.log("new flight failed!");
//       res.redirect(302, '/users/new');
//     }else{
//       res.redirect(302, '/flight/new');
//     }
//   });
// });

router.post('/', function (req, res){
  var newUser = User(req.body.user);
    newUser.save(function (err, user){

    res.redirect(301, "/users/login");
  });
});

//redirecting to the login website after sign up
router.get('/login', function(req, res){
    res.render('users/login');
});

router.post('/login', function (req, res){
  var attempt = req.body.user;

  User.findOne({username: attempt.username }, function (err, user){
    if(user && user.password == attempt.password){
      req.session.currentUser = user.username;
      res.redirect(301, "/welcome");
    }else{
      res.redirect(301, "/users/login");
    };
  });
})

router.get('/:id', function (req, res){
  User.findById(req.params.id, function (err, user){
    console.log(err, user);
  });
});

module.exports = router;
