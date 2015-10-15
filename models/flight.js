var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var flightAircraft = Schema({
  author:   { type: String },
  title:    { type: String },
  article:  [ String ]
  // comment:  [String ],
  // authorC:  [String]
  // comments: [{ body: String,
  //   date: { type: Date, default: Date.now},
  //   username: String }]
});

var Flight = mongoose.model('Flight', flightAircraft);

module.exports = Flight;
