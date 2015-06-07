var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

// Models
var User = require('./app/models/user');

mongoose.connect(process.env.MONGOLAB_URI);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/WWW'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

router.route('/users')

  /// Create a user 
  /// POST http://m14.herokuapp.com/api/users
  .post(function(req, res) {
    var user = new User();
    user.nameFirst = req.body.nameFirst;
    user.nameLast = req.body.nameLast;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user._id = new ObjectId;
    user.save(function(err) {
      if (err) res.send(err);
      res.json(user);
    });
  })

  /// Get all users.
  /// GET http://m14.herokuapp.com/api/users
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);
      res.json(users);
    });
  });

router.route('/users/:user_id')

  /// Get a user with an id
  /// GET http://m14.herokuapp.com/api/users/:user_id
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  })

  /// Update a user with an id
  /// PUT http://m14.herokuapp.com/api/users/:user_id
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      user.nameFirst = req.body.nameFirst || user.nameFirst;
      user.nameLast = req.body.nameLast || user.nameLast;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.save(function(err) {
        if (err) res.send(err);
        res.json(user);
      });
    });
  })

  /// Update a user with an id
  /// DELETE http://m14.herokuapp.com/api/users/:user_id
  .delete(function(req, res) {
    User.remove({_id: req.params.user_id}, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  });

router.get('/', function(req, res) {
  res.json({message: 'This is the M14 api!'});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
