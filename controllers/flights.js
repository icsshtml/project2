var express = require('express'),
    router = express.Router(),
    Flights   = require('../models/flight.js');


router.get('/', function(req, res){
  Flights.find({}, function (err, newFlight){
    if(err){
      res.redirect(302, '/welcome');
    }else{
      res.render('flight/index', {
        Flight: newFlight
      });
    }
  });
});

//push user comments
router.get('/:id/show', function(req, res){
  console.log("testingggggggg");
  var testID = req.params.id;

  Flight.findOne({
    _id: testID.push()
  }, function(err, testData){
    if(err){
      console.log(err);
      res.write("your data is not saved!");
      res.end();
    }else{
      res.render('flight/show');
    }
  });
});

router.post('/', function(req, res){
  var flighting = new Flights(req.body.Flight);

  flighting.save(function(err, newFlight){
    if(err){
      console.log("Data failed!");
      console.log(err);
      res.redirect(302, '/flight/new')
      //res.end();
    }else{
      console.log("Data saved!");
      res.redirect(302, '/flight');
    }
  });
});

// 43 line it was edit but I changed to index. it is a test
router.get('/:id/edit', function(req, res){
  var flightID = req.params.id;

  Flights.findOne({
    _id: flightID
  }, function(err, editData){
    if(err){
        res.write("YOUR data id is bad");
        res.end();
    }else{
      res.render('flight/edit',{
          Flight: editData
    });
  }
  });
});

router.patch('/:id', function(req, res){
  var flightID = req.params.id;
  var flightParams = req.body.Flight;

  Flights.findOne({
    _id: flightID
  }, function(err, editData){
    if(err){

    }else{
      editData.update(flightParams, function (errTwo, flighting){
        if(errTwo){
          console.log("ERROR UPDATING");
        }else{
          console.log("Updated");
          res.redirect(302, "/flight/");
        }
      })
    }
  });
});

router.delete('/:id', function(req, res){
    var flightID = req.params.id;

    Flights.remove({
      _id: flightID
    }, function(err){
      if(err){

      }else{
        res.redirect(302, '/flight');
      }
    });
});

// //going to the page that is to let users to add comments
// router.get('/', function(req, res){
//
//   Flights.find({}, function (err, newFlight){
//     if(err){
//     //  res.redirect(302, '/welcome');
//     console.log("data failed");
//     }else{
//       res.render('flight/show', {
//         Flight: newFlight
//       });
//     }
//   });
// });

router.get('/new', function(req, res){
  res.render('flight/new');
});

module.exports = router;
