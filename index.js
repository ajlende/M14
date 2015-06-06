var express = require('express');
var app = express();
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/WWW'));

app.get('/mongo', function (request, response) {
  console.log(process.env);
  MongoClient.connect(process.env.MONGOLAB_URI, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      response.send('Unable to connect to the mongoDB server. Error: ' + err);
    } else {
      console.log('Connection established');

      var collection = db.collection('users');

      collection.find({name: 'ajlende'}).toArray(function (err, result) {
        if (err) {
          console.log('Error finding ajlende');
          db.close();
          response.send('Error finding ajlende ' + err);
        } else if (result.length) {
          console.log(result);
          db.close();
          response.send(result);
        } else {
          console.log('"ajlende" not found. Adding him.');
          var ajlende = {name: 'ajlende', usename: 'ajlende', pasword: 'abc123', email: 'ajlende@gmail.com', userID: 0, connections: []}
          collection.insert([ajlende], function(err, result) {
            if (err) {
              console.log('There was an error adding "ajlende"');
              db.close();
              response.send('There was an error adding "ajlende"');
            } else {
              console.log('Added ajlende to users collection');
              db.close();
              response.send('Added ajlende to users collection');
            }
          });
        }
      });

    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
