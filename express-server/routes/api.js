// Import dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Models
const Quiz = require('./quiz.model.js');
const User = require('./user.model.js');

/* GET api listing. */
router.get('/', (req, res) => {
        res.send('api works');
});

/* GET all users. */
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* GET one users. */
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

/* Create a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});

// APIs
// select all
router.get('/quizes', function(req, res) {
  Quiz.find({}, function(err, docs) {
    if(err) return console.error(err);
    res.json(docs);
  });
});

// count all
router.get('/quizes/count', function(req, res) {
  Quiz.count(function(err, count) {
    if(err) return console.error(err);
    res.json(count);
  });
});

// create
router.post('/quizes', function(req, res) {
  var obj = new Quiz(req.body);
  obj.save(function(err, obj) {
    if(err) return console.error(err);
    res.status(200).json(obj);
  });
});

// find by id
router.get('/quizes/:id', function(req, res) {
  Quiz.findOne({_id: req.params.id}, function(err, obj) {
    if(err) return console.error(err);
    res.json(obj);
  })
});

// update by id
router.put('/quizes/:id', function(req, res) {
  Quiz.findOneAndUpdate({_id: req.params.id}, req.body, function(err) {
    if(err) return console.error(err);
    res.sendStatus(200);
  });
});

// delete by id
router.delete('/quizes/:id', function(req, res) {
  Quiz.findOneAndRemove({_id: req.params.id}, function(err) {
    if(err) return console.error(err);
    res.sendStatus(200);
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, docs) {
    if(err) return console.error(err);
    res.json(docs);
  });
});

router.post('/users', function(req, res) {
  var obj = new User(req.body);
  obj.save(function(err, obj) {
    if(err) return console.error(err);
    res.status(200).json(obj);
  });
});

module.exports = router;
