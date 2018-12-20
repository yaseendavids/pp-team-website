var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var flash = require('connect-flash');
var session = require('express-session');
var expressValidator = require('express-validator');
var request = require('request');
var passport = require('passport');
var back = require('express-back');
var fs = require("fs");
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

// User model
var User = require('../models/user');
// Notes model
var Notes = require('../models/notes');
// Calendar Model
var Calendar = require('../models/calendar');

// Express session Middleware
router.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true,
}));


// Express Messages Middleware
router.use(require('connect-flash')());
router.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Express Validator Middleware
router.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

router.use(back());


// Passport Config
require('../config/passport')(passport);
// Passport Middleware
router.use(passport.initialize());
router.use(passport.session());


// Set global variable for all pages
router.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// ********************************** ROUTING **********************************

// ************** GET home page **************
router.get('/', ensureAuthenticated, function(req, res, next) {

  let errors = req.validationErrors();

  Notes.find({}, function(err, notes){
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', {
        notes: notes,
        errors: errors
      })
    }
  }).sort(
    { "_id":-1 }
  )
});


// ************** ADD NOTE CHECK **************
router.get('/completed/:id', ensureAuthenticated, function(req, res, next){

  var note = {};
  note.completed = 'true';

  let query = {_id:req.params.id};

  Notes.update(query, note , function(err){
    if (err) {
      console.log(err)
    }
    else{
      req.flash("success",  "Task completed");
      res.redirect('/');
    }
  })
});

// ************** REMOVE  NOTE CHECK **************
router.get('/redo-note/:id', ensureAuthenticated, function(req, res, next){

  var note = {};
  note.completed = 'false';
  let query = {_id:req.params.id};

  Notes.update(query, note , function(err){
    if (err) {
      console.log(err)
    }
    else{
      res.redirect('/');
    }
  })
});

// ************** DELETE NOTE **************
router.delete('/delete-note/:id', ensureAuthenticated, function(req, res, next){

  let query = {_id:req.params.id};

  Notes.findById(req.params.id, function(err, note){
    if (err) {
      console.log(err);
      return;
    }
    else{
      Notes.remove(query, function(err){
        if (err){
          console.log(err);
          return;
        }
        req.flash('success', "Task Deleted");
        res.send("Successfully deleted Note");
      })
    }
  });
})

// ************** POST NEW NOTE **************
router.post('/add_new_note', ensureAuthenticated, function(req, res, next){

  var note = new Notes();

  note.username = req.body.username;
  note.note = req.body.note;
  note.importance = req.body.importance;
  note.completed = req.body.completed;

  note.save(function(err){
    if (err){
      console.log(err);
    }
    else{
      req.flash('success', 'New Task Added');
      res.redirect('/');
    }
  })
});

// ************** GET Calender PAGE **************
router.get('/calendar', ensureAuthenticated, function(req, res, next){

  let errors = req.validationErrors();

  Calendar.find({}, function(err, dates){
    if (err) {
      console.log(err);
    }
    else {
      res.render('calendar', {
        dates: dates,
        errors: errors,
        header: "Calendar",
      })
    }
  })
});

// ************** POST CALENDAR DATE **************
router.post('/calendar-form', ensureAuthenticated, function(req, res, next){

  var date = new Calendar();

  date.title = req.body.title + " - " + req.body.username;
  date.start = req.body.startDate;
  date.end = req.body.endDate;
  date.color = req.body.color;

  date.save(function(err){
    if (err){
      console.log(err);
    }
    else{
      req.flash('success', 'New Calendar Date Added');
      res.redirect('/calendar');
    }
  })
})

// ************** GET Hr Policy PAGE **************
router.get('/hr-policy', ensureAuthenticated, function(req, res, next){

  res.render('hr_policy', {
    header: "HR Policy"
  });
});
 
// ************** Access control **************
function ensureAuthenticated(req, res, next){

  let errors = req.validationErrors();
  var userToken =  localStorage.getItem("token");

  if (userToken === null || userToken === "" || userToken == null){
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }

  if (req.isAuthenticated()){
    return next();
  }

  else{
    User.findOne({token: userToken}, (err, users) => {
      if (err){
        console.log(err);
        res.redirect('/users/login');
      }
      else{
        if (users === null || users === ""){
          res.redirect('/users/login');
        }
        else{
          if (users.token == userToken){
            res.render('tokenlogin', {
              header: "Logging In",
              username: users.username,
              password: users.password
            });
          }
          else{
            console.log("Token not found");
            res.redirect('/users/login');
          }
        }
      }
    })
  }
}

module.exports = router;