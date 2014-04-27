var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var csv = require('csv');
var records = new Array();
var output = "";
var bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser());


mongoose.connect('mongodb://localhost/directory/');
var db = mongoose.connection;

var schoolSchema = mongoose.Schema({
      countyName: String,
      schoolName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      phone: String
    });


var School = mongoose.model('School', schoolSchema);


/*app.post('/findschool', function(req, res) {
    School.find({ schoolName: req.body.school_name }, function(err, school) {
      if(err) {console.log('Error: ' + err);}
      else {
        var match = school[0];
        res.send('<a href="/#/">Return</a>');
      }
    }); // end School.find()
}); // end app.post('/findschool',)*/



app.get('/findschool', function(req, res) {
    School.find({ schoolName: "Kearny High School" }, function(err, school) {
      if(err) {console.log('Error: ' + err);}
      else {
        var match = school[0];
        res.send(match);
      }
    }); // end School.find()
}); // end app.post('/findschool',)




app.get('/hello', function(req, res) {
  res.send("hello");
});

app.listen(3000, function() {
  console.log("Listening at port: 3000");
});
