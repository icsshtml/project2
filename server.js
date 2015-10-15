var express = require('express'),
    server  = express(),
    ejs     = require('ejs'),
    morgan  = require('morgan');
    bodyParser =require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    session = require('express-session');

var PORT = process.env.PORT || 3000,
  MONGOURI= process.env.MONGOLAB_URI || 'mongodb://localhost:27017';
  // dbname="jondb";

server.set('views', './views');
server.set('view engine', 'ejs');
server.use(morgan('dev'));

server.use(session({
  secret: "do I know you?",
  resave: true,
  saveUninitialized: false
}));

server.use(express.static("./public"));

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(methodOverride('_method'));

server.use(function (req, res, next){
  console.log("==============Start================");
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("REQ DOT SESSION", req.session);
  console.log("==============End===================");
  next();
});

var userController = require('./controllers/users.js');
server.use('/users', userController);

server.use(function (req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    next();
  } else {
    res.redirect(302, '/users/login');
  }
})

var flightController = require('./controllers/flights.js');
server.use('/flight', flightController);


server.get('/welcome', function(req, res){
  if(req.session.currentUser){
      res.render('welcome',{
      currentUser: req.session.currentUser
    });
  }else{
    res.redirect(302, '/users/login')
  }
});

server.get('/welcome', function (req, res) {
  res.render('welcome');
});

server.use(function (req, res, next){
  res.send("YOUR JOURNEY ends HERE < GRASSPhooer..");
  res.end();
});

mongoose.connect('mongodb://localhost:27017/flightTester');
var db = mongoose.connection;

db.on('error', function(){
  console.log("Database error!");
});

db.once('open', function(){
  console.log("Database UP AND RUNNING!");
  server.listen(PORT, function(){
  console.log("I am listening..");
  });
});
